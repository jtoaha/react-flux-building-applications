import { EventEmitter } from "events"; // Our store needs to emit an event each time a change occurs, so can extend our classes behavior
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = []; // this is private, and remains private since not exported 

/*
There are 3 functions in every Flux store: 
1. addChangeListener (wraps on)
2. removeChangeListener (wraps removeListener)
3. emitChange(wraps emit)

(each provided by event emitter)
*/

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(course => course.slug === slug);
  }
}

const store = new CourseStore();

/*
Another piece that is part of every store: 
We need to register the store with the dispatcher (import it, )

- Switches based on every action type that is passed in
*/

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course); // *** Anytime the store changes, we need to emitChange
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    // nothing to do here, if none of the cases match
  }
});

export default store;
