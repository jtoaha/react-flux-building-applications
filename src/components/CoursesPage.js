import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses()); // initialize data to use data from flux store

  useEffect(() => {
    courseStore.addChangeListener(onChange); 
    if (courseStore.getCourses.length === 0) loadCourses(); // If there are no courses

    // *** With useEffect, you declare the code to run on amount by returning a function *** 
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount (When you add an event listener on mount, make sure to clean up when component unmounts)
  }, []); // this will set courses to an empty array if the flux store is empty

  function onChange() { // Get list of courses, goal here is to get it just once
      // we'll call this inside the useEffect hook which triggers when the component is mounted
    setCourses(courseStore.getCourses()); // will add courses to component's state using setCourses
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
