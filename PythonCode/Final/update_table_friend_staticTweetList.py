import pyodbc
import requests
import json
from datetime import datetime
import time


#its bad practice to place your bearer token directly into the script (this is just done for illustration purposes)
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAABWWHAEAAAAA5qMcqgr3KmW9M9c%2FjTpbLpNfstY%3DQJpI38tdylRmy2HXl5NsKI0F3giYdkC29dL1n4zI0LecMhmmGu"

BEARER_TOKEN_LIST = []
BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAABWWHAEAAAAA5qMcqgr3KmW9M9c%2FjTpbLpNfstY%3DQJpI38tdylRmy2HXl5NsKI0F3giYdkC29dL1n4zI0LecMhmmGu")
BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAACiEMAEAAAAARUzHxsT2zpppvmEJfKFNBDlpPQM%3DdETIuX1axy9zEY34zOVIN7gj59spaljov29qCeabgwgRtSErsi")
BEARER_TOKEN_LIST.append("AAAAAAAAAAAAAAAAAAAAADorMAEAAAAAAu%2F%2BXThqtmp1Ama4CC1aLsnsC8w%3DGh1bYekF1adekGVE4snlHieZ2bakUGWITXHXANdooG58eORl4Q")

BEARER_TOKEN_WORKING_TIME = []
BEARER_TOKEN_WORKING_TIME.append(0)
BEARER_TOKEN_WORKING_TIME.append(0)
BEARER_TOKEN_WORKING_TIME.append(0)

bearer_token_index = 0



conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                      'Server=ISE-NODEJS-W\SQLEXPRESS;'
                      'Database=repFeed;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

# Select all rows of user_id and tweet_id (tweets_id_list) From friend_staticTweetList Table.
# cursor.execute('SELECT user_id, tweet_id FROM friend_staticTweetList')
cursor.execute('SELECT * FROM friend_staticTweetList')
origin_table_friend_staticTweetList = cursor.fetchall()

print("Num of rows in table friend_staticTweetList:", len(origin_table_friend_staticTweetList))
print()




# start_index = 54851
start_index = 492544
# end_index = 35877
end_index = len(origin_table_friend_staticTweetList)

# Note: parameter line_index = DB_ROW - 1 (the last row in the DB that been committed, minus 1).
line_index = start_index
api_limit_rate = 300
api_limit_minutes_time = 15
first_request_time = datetime.now()

last_committed_row = 0
requests_counter = 0






#search term
query = ""

#twitter fields to be returned by api call
tweet_fields = ""


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


def search_twitter(line_index, last_committed_row, requests_counter, first_request_time, bearer_token_index, tweets_id_list, query, tweet_fields):
    # bearer_token = BEARER_TOKEN
    bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
    headers = {"Authorization": "Bearer {}".format(bearer_token)}

    url = "https://api.twitter.com/2/tweets?ids=" + tweets_id_list
    response = requests.request("GET", url, headers=headers)

    while response.status_code == 429 and response.text == "Rate limit exceeded\n":
        print("#################################################################################")
        print("#################################################################################")
        conn.commit()
        last_committed_row = line_index
        print("Commit of line_index:", last_committed_row)
        requests_counter = 0

        print("BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        bearer_token_index = update_working_time(first_request_time, bearer_token_index)
        print("BEARER_TOKEN:", BEARER_TOKEN_LIST[bearer_token_index])

        first_request_time = datetime.now()

        bearer_token = BEARER_TOKEN_LIST[bearer_token_index]
        headers = {"Authorization": "Bearer {}".format(bearer_token)}

        url = "https://api.twitter.com/2/tweets?ids=" + tweets_id_list
        response = requests.request("GET", url, headers=headers)

    if response.status_code != 200:
        print(response.status_code)
        print(response.text)
        # raise Exception(response.status_code, response.text)

    return response.json(), last_committed_row, requests_counter, first_request_time, bearer_token_index


def get_available_tweets_id_list(tweets_id_list, first_request_time, requests_counter, line_index, last_committed_row, bearer_token_index):
    """
    Get the available list of tweets id, from the given tweets id list.
    Using API of Twitter.
    :param tweets_id_list: Given tweets id list (type String).
    :return: List of tweets id, separated by white space: "id1 id2 id3" (type String), or 'none'.
    """
    tweets_id_array = tweets_id_list.split(" ")

    tweets_id_list = ""

    while len(tweets_id_array) > 100:
        tweets_id_list_for_api = tweets_id_array[:100]
        tweets_id_list_for_api = ','.join(tweets_id_list_for_api)

        json_response, last_committed_row, requests_counter, first_request_time, bearer_token_index = search_twitter(line_index, last_committed_row, requests_counter, first_request_time, bearer_token_index, tweets_id_list_for_api, query=query, tweet_fields=tweet_fields)
        requests_counter = requests_counter + 1
        print("       requests_counter:", requests_counter)

        if "data" in json_response.keys():
            # Collect only the tweets id, separated by white space.
            for tweet_dict_details in json_response.get("data"):
                tweets_id_list = tweets_id_list + " " + tweet_dict_details.get("id")

        tweets_id_array = tweets_id_array[100:]

    tweets_id_list_for_api = ','.join(tweets_id_array)

    json_response, last_committed_row, requests_counter, first_request_time, bearer_token_index = search_twitter(line_index, last_committed_row, requests_counter, first_request_time, bearer_token_index, tweets_id_list_for_api, query=query, tweet_fields=tweet_fields)
    requests_counter = requests_counter + 1

    print("       requests_counter:", requests_counter)

    # Case when there are available tweets.
    if "data" in json_response.keys():
        tweets_id_list = ""

        # Collect only the tweets id, separated by white space.
        for tweet_dict_details in json_response.get("data"):
            tweets_id_list = tweets_id_list + " " + tweet_dict_details.get("id")

        # Remove the first ' ' (the white space).
        tweets_id_list = tweets_id_list[1:]

    if tweets_id_list == "":
        tweets_id_list = "none"

    return tweets_id_list, first_request_time, requests_counter, line_index, bearer_token_index


def update_tweet_id_for_user_id_in_db(user_id, tweets_list):
    user_id = "'" + user_id + "'"
    tweets_list = "'" + tweets_list + "'"

    # Update tweet_id of user_id In friend_dynamicTweetList Table.
    cursor.execute('UPDATE friend_staticTweetList SET tweet_id = ' + tweets_list + ', fixed = ''1'' WHERE user_id = ' + user_id + '')




# try:
#     while line_index < len(origin_table_friend_staticTweetList):
#         if line_index == end_index:
#             print("end_index:", end_index, "-> break")
#             break
#         print("Row in DB", line_index + 1, end=" -> ")
#         current_user_id = origin_table_friend_staticTweetList[line_index][0]
#         print("current_user_id:", current_user_id)
#         origin_tweets_id_list = origin_table_friend_staticTweetList[line_index][1]
#
#         available_tweets_id_list, first_request_time, requests_counter, last_committed_row, bearer_token_index = get_available_tweets_id_list(origin_tweets_id_list, first_request_time, requests_counter, line_index, last_committed_row, bearer_token_index)
#
#         print("origin_tweets_id_list   : ", origin_tweets_id_list)
#         print("available_tweets_id_list: ", available_tweets_id_list)
#
#         update_tweet_id_for_user_id_in_db(current_user_id, available_tweets_id_list)
#
#         line_index = line_index + 1
#         print()
#
#     conn.commit()
#     last_committed_row = line_index
#
#     print()
#     print("Committed all tweet_id for each user_id in the DB, total rows:", last_committed_row)
#     print("At time:", datetime.now())
#
# except:
#     print()
#     print("Last commit of line index:", last_committed_row)
#     print("At time:", datetime.now())


while line_index < len(origin_table_friend_staticTweetList):
    # if origin_table_friend_staticTweetList[line_index][2] == 1:
    #     print("line_index:", line_index, "already fixed")
    #     break

    if line_index == end_index:
        print("end_index:", end_index, "-> break")
        break

    # Only if the current line_index (DB Row = line_index+1) did not fixed yet.
    if origin_table_friend_staticTweetList[line_index][2] != 1:
        print("Row in DB", line_index + 1, end=" -> ")
        current_user_id = origin_table_friend_staticTweetList[line_index][0]
        print("current_user_id:", current_user_id)
        origin_tweets_id_list = origin_table_friend_staticTweetList[line_index][1]

        available_tweets_id_list, first_request_time, requests_counter, last_committed_row, bearer_token_index = get_available_tweets_id_list(origin_tweets_id_list, first_request_time, requests_counter, line_index, last_committed_row, bearer_token_index)

        print("origin_tweets_id_list   : ", origin_tweets_id_list)
        print("available_tweets_id_list: ", available_tweets_id_list)

        update_tweet_id_for_user_id_in_db(current_user_id, available_tweets_id_list)
        print()

    line_index = line_index + 1

conn.commit()
last_committed_row = line_index

print()
print("Last commit of line_index:", last_committed_row)
print("At time:", datetime.now())
