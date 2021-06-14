import pyodbc
import requests
import json
from datetime import datetime
import time

# its bad practice to place your bearer token directly into the script (this is just done for illustration purposes)
# BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAABWWHAEAAAAA5qMcqgr3KmW9M9c%2FjTpbLpNfstY%3DQJpI38tdylRmy2HXl5NsKI0F3giYdkC29dL1n4zI0LecMhmmGu"
# BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACiEMAEAAAAARUzHxsT2zpppvmEJfKFNBDlpPQM%3DdETIuX1axy9zEY34zOVIN7gj59spaljov29qCeabgwgRtSErsi"
# BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAADorMAEAAAAAAu%2F%2BXThqtmp1Ama4CC1aLsnsC8w%3DGh1bYekF1adekGVE4snlHieZ2bakUGWITXHXANdooG58eORl40"
# BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAH1GMAEAAAAAFCG%2By1YUQ%2BTIsL5xR99IE7rgzVg%3DP26xOAzMcFCdyz0NAE1W26zVyV3c7oug0xMzdEik4vvbrTkEnk"
# BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAH%2BKMAEAAAAA5EnSsOOLHGPIYhDwSFOZxslMX9A%3DTr4xmv60thqidwPAqA9Es16xvFW9obYsHZqotU2GxomlAeFaFw"

BEARER_TOKEN_LIST = []
BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAABWWHAEAAAAA5qMcqgr3KmW9M9c%2FjTpbLpNfstY%3DQJpI38tdylRmy2HXl5NsKI0F3giYdkC29dL1n4zI0LecMhmmGu")
# BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAACiEMAEAAAAARUzHxsT2zpppvmEJfKFNBDlpPQM%3DdETIuX1axy9zEY34zOVIN7gj59spaljov29qCeabgwgRtSErsi")
# BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAADorMAEAAAAAAu%2F%2BXThqtmp1Ama4CC1aLsnsC8w%3DGh1bYekF1adekGVE4snlHieZ2bakUGWITXHXANdooG58eORl4Q")

BEARER_TOKEN_WORKING_TIME = []
BEARER_TOKEN_WORKING_TIME.append(0)
# BEARER_TOKEN_WORKING_TIME.append(0)
# BEARER_TOKEN_WORKING_TIME.append(0)

bearer_token_index = 0


conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                      'Server=ISE-NODEJS-W\SQLEXPRESS;'
                      'Database=repFeed;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

# Select All From friend_dynamicTweetList Table, the user_id and tweet_id (tweets_id_list).
cursor.execute('SELECT * FROM friend_dynamicTweetList')
origin_table_friend_dynamicTweetList = cursor.fetchall()

# origin_table_friend_dynamicTweetList = []
# origin_table_friend_dynamicTweetList.append("12912562")
# origin_table_friend_dynamicTweetList.append("12912882")
# origin_table_friend_dynamicTweetList.append("12912542")
# origin_table_friend_dynamicTweetList.append("12912912")
# origin_table_friend_dynamicTweetList.append("12913252")

print("Num of user_id in table friend_dynamicTweetList:", len(origin_table_friend_dynamicTweetList))
print()


def create_politics_query_list():
    with open(politics_filename) as f:
        lines = [line.rstrip() for line in f]

    lines = list(filter(None, lines))

    # Note: Explanation why we split into many queries:
    #           Using Get request, we have Rule max length: 512
    #           Rule text pattern is: "from:username (word_1 OR ... OR word_N)"
    #           So each query "word_1 to word_N", will be in length of: 512-23=489
    query_max_length = 512

    from_length = 4
    colon_length = 1
    username_max_length = 15
    spacing_length = 1
    open_bracket_length = 1
    close_bracket_length = 1

    const_length = from_length + colon_length + username_max_length + spacing_length + open_bracket_length + close_bracket_length
    query_length = query_max_length - const_length

    query_list = []
    query = ""
    first_word = True
    for line in lines:
        # the "if" is only for the first time
        if first_word:
            line = line.replace(" ", "%20")
            query = line
            first_word = False
        else:
            line = line.replace(" ", "%20")
            if (len(query) + len(line)) <= query_length:
                query = query + "%20OR%20" + line
            else:
                query = "(" + query + ")"
                query_list.append(query)

                query = line

    query = "(" + query + ")"
    query_list.append(query)

    return query_list


def update_working_time(first_request_time, bearer_token_index):
    last_request_time = datetime.now()
    working_time = (last_request_time - first_request_time)
    working_time_seconds = working_time.total_seconds()
    working_time_minutes = working_time_seconds / 60
    working_time_minutes = round(working_time_minutes, 2)

    print("       BEARER_TOKEN_WORKING_TIME:", BEARER_TOKEN_WORKING_TIME)
    print("       Add working_time_minutes: ", working_time_minutes)

    # Update the working time (and waiting time) of each BEARER_TOKEN.
    for working_index in range(len(BEARER_TOKEN_WORKING_TIME)):
        if BEARER_TOKEN_WORKING_TIME[working_index] != 0:
            BEARER_TOKEN_WORKING_TIME[working_index] = BEARER_TOKEN_WORKING_TIME[working_index] + working_time_minutes
    # Init the working time of the current BEARER_TOKEN.
    BEARER_TOKEN_WORKING_TIME[bearer_token_index] = working_time_minutes

    print("       BEARER_TOKEN_WORKING_TIME:", BEARER_TOKEN_WORKING_TIME)

    print("       bearer_token_index:", bearer_token_index)

    # Move to the next BEARER_TOKEN.
    if bearer_token_index != len(BEARER_TOKEN_WORKING_TIME) - 1:
        bearer_token_index = bearer_token_index + 1
    else:
        bearer_token_index = 0

    print("       bearer_token_index:", bearer_token_index)

    # Check if the new BEARER_TOKEN need to sleep before asking for a request.
    if api_limit_minutes_time > BEARER_TOKEN_WORKING_TIME[bearer_token_index] and BEARER_TOKEN_WORKING_TIME[bearer_token_index] != 0:
        minutes_to_sleep = api_limit_minutes_time - BEARER_TOKEN_WORKING_TIME[bearer_token_index]
        seconds_to_sleep = minutes_to_sleep * 60
        print("       Going to sleep at:", last_request_time)
        print("                        for %.2f" % minutes_to_sleep, "minutes = %.2f" % seconds_to_sleep, "seconds.")

        time.sleep(seconds_to_sleep + 1)

        minutes_to_sleep = round(minutes_to_sleep, 2)

        # Update the working time (and waiting time) of each BEARER_TOKEN.
        for working_index in range(len(BEARER_TOKEN_WORKING_TIME)):
            if working_index != bearer_token_index:
                BEARER_TOKEN_WORKING_TIME[working_index] = BEARER_TOKEN_WORKING_TIME[working_index] + minutes_to_sleep

        print("       Wake up at: ", datetime.now())

    # Init the working time of the current BEARER_TOKEN.
    BEARER_TOKEN_WORKING_TIME[bearer_token_index] = 0
    print("       Current time: ", datetime.now())
    print("       BEARER_TOKEN_WORKING_TIME:", BEARER_TOKEN_WORKING_TIME)


    return bearer_token_index


def twitter_get_request_get_username_by_user_id(line_index, last_committed_row, first_request_time, bearer_token_index, user_id):
    bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
    headers = {"Authorization": "Bearer {}".format(bearer_token)}

    url = "https://api.twitter.com/labs/2/users/" + str(user_id)
    response = requests.request("GET", url, headers=headers)

    while response.status_code == 429 and response.text == "Rate limit exceeded\n":
        print()
        print("#################################################################################")
        conn.commit()
        last_committed_row = line_index
        print("       Commit of line_index:", last_committed_row)

        print("       BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        bearer_token_index = update_working_time(first_request_time, bearer_token_index)
        print("       BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        first_request_time = datetime.now()

        bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
        headers = {"Authorization": "Bearer {}".format(bearer_token)}

        url = "https://api.twitter.com/labs/2/users/" + user_id
        response = requests.request("GET", url, headers=headers)

    if response.status_code != 200:
        print(response.status_code)
        print(response.text)

    # return response.json()
    return response.json(), last_committed_row, first_request_time, bearer_token_index



def get_username_by_user_id(user_id, first_request_time, line_index, last_committed_row, bearer_token_index):
    # json_response = twitter_get_request_get_username_by_user_id(user_id)

    json_response, last_committed_row, first_request_time, bearer_token_index = twitter_get_request_get_username_by_user_id(line_index, last_committed_row, first_request_time, bearer_token_index, user_id)

    # Case when user is suspended, or no exists.
    if "errors" in json_response.keys():
        # return "suspended"
        return "suspended", first_request_time, line_index, bearer_token_index

    # Case when user exists.
    elif "data" in json_response.keys():
        # Get the username.
        user_details = json_response.get("data")
        user_name = user_details.get("username")
        # return user_name
        return user_name, first_request_time, line_index, bearer_token_index

    # return "usernameProblem"
    return "usernameProblem", first_request_time, line_index, bearer_token_index


# def twitter_get_request_search_tweets_id_by_username_and_politics_words(username, query):
def twitter_get_request_search_tweets_id_by_username_and_politics_words(line_index, last_committed_row, first_request_time, bearer_token_index, username, query):
    bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
    headers = {"Authorization": "Bearer {}".format(bearer_token)}

    url = "https://api.twitter.com/2/tweets/search/recent?query=from%3A" + username + "%20" + query + "%20&max_results=10"
    response = requests.request("GET", url, headers=headers)

    while response.status_code == 429 and response.text == "Rate limit exceeded\n":
        print()
        print("#################################################################################")
        conn.commit()
        last_committed_row = line_index
        print("       Commit of line_index:", last_committed_row)

        print("       BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        bearer_token_index = update_working_time(first_request_time, bearer_token_index)
        print("       BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        first_request_time = datetime.now()

        bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
        headers = {"Authorization": "Bearer {}".format(bearer_token)}

        url = "https://api.twitter.com/2/tweets/search/recent?query=from%3A" + username + "%20" + query + "%20&max_results=10"
        response = requests.request("GET", url, headers=headers)

    if response.status_code != 200:
        print(response.status_code)
        print(response.text)

    # return response.json()
    return response.json(), last_committed_row, first_request_time, bearer_token_index



# def get_tweets_id_by_username(username):
def get_tweets_id_by_username(username, first_request_time, line_index, last_committed_row, bearer_token_index):
    tweets_list = ""

    for query in query_list:
        # json_response = twitter_get_request_search_tweets_id_by_username_and_politics_words(username, query)

        json_response, last_committed_row, first_request_time, bearer_token_index = twitter_get_request_search_tweets_id_by_username_and_politics_words(line_index, last_committed_row, first_request_time, bearer_token_index, username, query)

        # Case when user is suspended, or no access to his tweets.
        if "errors" in json_response.keys():
            # return "suspended"
            return "suspended", first_request_time, line_index, bearer_token_index

        # Case when user has tweets.
        elif "data" in json_response.keys():
            current_tweets_list = ""

            # Collect only the tweets id separated by white space.
            for tweet_dict_details in json_response.get("data"):
                current_tweets_list = current_tweets_list + " " + tweet_dict_details.get("id")

            # Remove the first ' ' (the white space).
            current_tweets_list = current_tweets_list[1:]
            tweets_list = tweets_list + " " + current_tweets_list

    if tweets_list != "":
        # Remove the first ' ' (the white space).
        # return tweets_list[1:]
        return tweets_list[1:], first_request_time, line_index, bearer_token_index

    # return "noTweets"
    return "noTweets", first_request_time, line_index, bearer_token_index


def update_tweet_id_for_user_id_in_db(user_id, tweets_list):
    user_id = "'" + str(user_id) + "'"
    tweets_list = "'" + tweets_list + "'"

    # Update tweet_id and fixed of user_id In friend_dynamicTweetList Table.
    cursor.execute('UPDATE friend_dynamicTweetList SET tweet_id = ' + tweets_list + ', fixed = ''1'' WHERE user_id = ' + user_id + '')


# politics_filename = 'politics_whitelist_20210307.txt'
politics_filename = 'Final/politics_whitelist_20210307.txt'
query_list = create_politics_query_list()

start_index = 0
end_index = len(origin_table_friend_dynamicTweetList)
# end_index = 5

# Note: parameter line_index = DB_ROW - 1 (the last row in the DB that been committed, minus 1).
line_index = start_index
# api_limit_rate = 300
api_limit_minutes_time = 15
first_request_time = datetime.now()

last_committed_row = 0

while line_index < len(origin_table_friend_dynamicTweetList):
    if line_index == end_index:
        print("end_index:", end_index, "-> break")
        break

    # Only if the current line_index (DB Row = line_index+1) did not fixed yet.
    if origin_table_friend_dynamicTweetList[line_index][2] != 1:
        print("DB row", line_index + 1, end=" -> ")
        current_user_id = origin_table_friend_dynamicTweetList[line_index][0]
        # current_user_id = origin_table_friend_dynamicTweetList[line_index]
        print("current_user_id:", current_user_id, end=" -> ")
        # current_username = get_username_by_user_id(current_user_id)
        current_username, first_request_time, last_committed_row, bearer_token_index = get_username_by_user_id(current_user_id, first_request_time, line_index, last_committed_row, bearer_token_index)
        print("current_username:", current_username, end=" -> ")

        # current_username = twitter_get_request_get_username_by_user_id(current_user_id)

        current_user_tweets_list = "suspended"
        if current_username != "suspended":
            # current_user_tweets_list = get_tweets_id_by_username(current_username)
            current_user_tweets_list, first_request_time, last_committed_row, bearer_token_index = get_tweets_id_by_username(current_username, first_request_time, line_index, last_committed_row, bearer_token_index)

        print("TWEETS LIST:", current_user_tweets_list)

        update_tweet_id_for_user_id_in_db(current_user_id, current_user_tweets_list)
        print()

    line_index = line_index + 1

conn.commit()
last_committed_row = line_index

print()
print("Last commit of row:", last_committed_row)
print("At time:", datetime.now())
