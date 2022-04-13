import { Dispatcher } from "flux";
const dispatcher = new Dispatcher();
export default dispatcher;
// There's only one dispatcher per app, it's a singleton
// Stores will register with this dispatcher to say they'd like to be informed when actions occur
// The dispatcher will hold a list of callbacks and all app's actions will be dispatched via this dispatcher