import React, { useState, useEffect } from 'react';
import JobBoardComponent from './components/JobBoardComponent';
import data from './assets/data.json';
// console.log(data);
function App() {

  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];

    if (tools) {
      tags.push(...tools);
    }
    if (languages) {
      tags.push(...languages);
    }

    // return tags.some((tag) => filters.includes(tag));
    return filters.every(filter => tags.includes(filter));
  };
  const handleTagClick = (tag) => {
    // avoid readding Tag
    if (filters.includes(tag)) return;
    // avoid readding completed
    setFilters([...filters, tag]);
  };
  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };
  const filteredJobs = jobs.filter(filterFunc);
  // for button clear
  const clearFilters = () => {
    setFilters([]);
  };
  // useEffect(() => {
  //   setJobs(data);
  // fetching data locally
  // fetch('./assets/data.json').then(res => res.json())
  //   .then(data => {
  //     setJobs(data);
  //   })
  // }, []);
  // console.log(jobs);
  return (
    <>


      {/* <h1 className="text-4xl">Job Listing</h1> */}
      <header className="bg-teal-500 mb-12">
        <img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-image" />
      </header>
      <div className="container m-auto">
        {/* 1. Looping over the jobs  */}
        {/* for on click function  */}
        {/* <div className={`flex bg-white shadow-md mx-10 my-16 p-6 rounded `}></div> */}
        {
          filters.length > 0 && (

            <div className={`flex bg-white  shadow-md -my-20 mb-16 mx-10 p-6 rounded z-10 relative`} >

              {filters.map((filter) => (
                <span onClick={() => handleFilterClick(filter)}> <span className="text-teal-500 bg-teal-100 font-bold mr-4 mb-4 p-2 rounded lg:mb-0 cursor-pointer">
                  {filter}
                  <span className="text-teal-100 bg-teal-500 font-bold ml-2 mr-4 mb-4 p-2 rounded lg:mb-0 cursor-pointer border-l-4 border-teal-600 border-solid">x</span>

                </span>
                </span>
              ))}
              <button onClick={clearFilters} className="font-bold text-gray-700 ml-auto outline-none">Clear</button>

            </div>


          )}
        {jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
            filteredJobs.map((job) => (
              <JobBoardComponent
                job={job}
                key={job.id}
                handleTagClick={handleTagClick}
              />

            ))
          )}
      </div>
    </>
  );
}

export default App;
