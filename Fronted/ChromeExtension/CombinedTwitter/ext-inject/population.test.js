// var webdriver = require('selenium-webdriver') // Added line
// var By = require('selenium-webdriver').By,
//   until = require('selenium-webdriver').until,
//   chrome = require('selenium-webdriver/chrome'),
//   test = require('selenium-webdriver/testing');

// const population = require('./population');


let population = require('./population');

document.body.innerHTML = `    <div id="page" class="md:w-full h-full">
      <div style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
        <!-- Population title -->
        <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
          <h1 class="text-xl font-bold">Population</h1>
          <!-- <i class="fas fa-globe-europe text-xl text-blue"></i> -->
        </div>
        
        <!-- Filters for Population's Segmentation.	
              The filters are: age, country, party, gender and race -->
        <div style="margin-bottom: 1px; margin-left: 14px;">Please Choose Your Filters:</div>

        <div>
          <select
            id="age"
            class="mb-2"
            style="
              border: 2px solid #ced4da;
              width: 31%;
              margin-top: 1px;
              margin-bottom: 1px;
              margin-right: 5px;
              margin-left: 14px;
            "
          ></select>

          <select
            id="country"
            class="mb-2"
            style="
              border: 2px solid #ced4da;
              width: 31%;
              margin-top: 1px;
              margin-bottom: 1px;
              margin-right: 5px;
            "
          ></select>

          <select
            id="gender"
            class="mb-2"
            style="
              border: 2px solid #ced4da;
              width: 31%;
              margin-top: 1px;
              margin-right: 5px;
            "
          ></select>

          <select
            id="party"
            class="mb-2"
            style="
              border: 2px solid #ced4da;
              width: 31%;
              margin-top: 1px;
              margin-right: 5px;
              margin-left: 14px;
            "
          ></select>

          <select
            id="race"
            class="mb-2"
            style="
              border: 2px solid #ced4da;
              width: 31%;
              margin-top: 1px;
              margin-right: 5px;
            "
          ></select>
        </div>

        <!-- Buttons for search and reset  -->
        <div>
          <button
            type="submit"
            class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
            id="search"
            style="position: relative; left: 62%"
          >
            Search
          </button>
  
          <button
            type="submit"
            class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
            id="reset"
            style="position: relative; left: 65%"
          >
            Reset
          </button>

          <div class="px-5 py-1 border-b border-lighter"></div>
        </div>
      </div>
      
      <!-- this is where the tweets are displayed -->
      <div id="feed" style="margin-left: 14px;"></div>          
    </div>
    <script src="population.js"></script>`


// test('check the sum' , () =>{
//     expect(population.sum(1,2)).toBe(3);
// })


test('load the ages' , () =>{
    let age = document.getElementById('age');
    population.age_load();
    let option = age.childNodes;
    expect(option[0].value).toBe("age_bucket")
    expect(option[1].value).toBe("18-24")
    expect(option[2].value).toBe("25-34")
    expect(option[3].value).toBe("35-49")
    expect(option[4].value).toBe("50-64")
    expect(option[5].value).toBe("65+")
    // expect(population.age_load())
})

test('load the states' , () =>{
    let state = document.getElementById('country');
    population.country_load();
    let option = state.childNodes;
    expect(option[0].value).toBe("country")
    expect(option[1].value).toBe("AK")
    expect(option[2].value).toBe("AL")
    expect(option[3].value).toBe("AR")
    expect(option[4].value).toBe("AZ")
    expect(option[5].value).toBe("CA")
    expect(option[6].value).toBe("CO")
    expect(option[7].value).toBe("CT")
    expect(option[8].value).toBe("DC")
    expect(option[9].value).toBe("DE")
    expect(option[10].value).toBe("FL")
    expect(option[11].value).toBe("GA")
    expect(option[12].value).toBe("HI")
    expect(option[13].value).toBe("IA")
    expect(option[14].value).toBe("ID")
    expect(option[15].value).toBe("IL")
    expect(option[16].value).toBe("IN")
    expect(option[17].value).toBe("KS")
    expect(option[18].value).toBe("KY")
    expect(option[19].value).toBe("LA")
    expect(option[20].value).toBe("MA")
    expect(option[21].value).toBe("MD")
    expect(option[22].value).toBe("ME")
    expect(option[23].value).toBe("MI")
    expect(option[24].value).toBe("MN")
    expect(option[25].value).toBe("MO")
    expect(option[26].value).toBe("MS")
    expect(option[27].value).toBe("MT")
    expect(option[28].value).toBe("NC")
    expect(option[29].value).toBe("ND")
    expect(option[30].value).toBe("NE")
    expect(option[31].value).toBe("NH")
    expect(option[32].value).toBe("NJ")
    expect(option[33].value).toBe("NM")
    expect(option[34].value).toBe("NV")
    expect(option[35].value).toBe("NY")
    expect(option[36].value).toBe("OH")
    expect(option[37].value).toBe("OK")
    expect(option[38].value).toBe("OR")
    expect(option[39].value).toBe("PA")
    expect(option[40].value).toBe("RI")
    expect(option[41].value).toBe("SC")
    expect(option[42].value).toBe("SD")
    expect(option[43].value).toBe("TN")
    expect(option[44].value).toBe("TX")
    expect(option[45].value).toBe("UT")
    expect(option[46].value).toBe("VA")
    expect(option[47].value).toBe("VT")
    expect(option[48].value).toBe("WA")
    expect(option[49].value).toBe("WI")
    expect(option[50].value).toBe("WV")
    expect(option[51].value).toBe("WY")
    // expect(population.country_load())
})

test('load the genders' , () =>{
    let gender = document.getElementById('gender');
    population.gender_load();
    let option = gender.childNodes;
    expect(option[0].value).toBe("gender")
    expect(option[1].value).toBe("Female")
    expect(option[2].value).toBe("Male")
})

test('load the parties' , () =>{
   let party = document.getElementById('party');
    population.party_load();
    let option = party.childNodes;
    expect(option[0].value).toBe("party")
    expect(option[1].value).toBe("Democrat")
    expect(option[2].value).toBe("Independent")
    expect(option[3].value).toBe("Republican")
    expect(option[4].value).toBe("NA")
    // expect(population.party_load())
})

test('load the races' , () =>{
    let race = document.getElementById('race');
    population.race_load();
    let option = race.childNodes;
    expect(option[0].value).toBe("race")
    expect(option[1].value).toBe("African-American")
    expect(option[2].value).toBe("Caucasian")
    expect(option[3].value).toBe("Hispanic")
    expect(option[4].value).toBe("Other")
    // expect(population.race_load())
})
// test("Should not throw", async () => {
//         await expect(population.age_load()).resolves.not.toThrow();
//       });   



test('create the spinner' , () =>{
    
    // const page = document.getElementById('page');
    jest.spyOn(document.body, 'append');
    population.create_spinner();
    expect(document.getElementById('spinner')).not.toBe(null)
})

test('present error message' , () =>{
    
    // const page = document.getElementById('page');
    jest.spyOn(document.body, 'append');
    population.create_error_message();
    expect(document.getElementById('error_message')).not.toBe(null)
})


test('reset the page' , () =>{
    const reset = document.getElementById('reset');
    reset.click();
    expect(feed).not.toBe(null);
})


