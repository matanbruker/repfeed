repfeed = require('./repfeed');

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



test('create the spinner' , () =>{
    
    // const page = document.getElementById('page');
    jest.spyOn(document.body, 'append');
    repfeed.create_spinner();
    expect(document.getElementById('spinner')).not.toBe(null)
})

test('present error message' , () =>{
    
    // const page = document.getElementById('page');
    jest.spyOn(document.body, 'append');
    repfeed.create_error_message();
    expect(document.getElementById('error_message')).not.toBe(null)
})