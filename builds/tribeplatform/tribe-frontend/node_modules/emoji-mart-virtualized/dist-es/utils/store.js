var NAMESPACE = 'emoji-mart';
var isLocalStorageSupported = typeof window !== 'undefined' && 'localStorage' in window;
var getter;
var setter;

function setHandlers(handlers) {
  handlers || (handlers = {});
  getter = handlers.getter;
  setter = handlers.setter;
}

function setNamespace(namespace) {
  NAMESPACE = namespace;
}

function update(state) {
  for (var key in state) {
    var value = state[key];
    set(key, value);
  }
}

function set(key, value) {
  if (setter) {
    setter(key, value);
  } else {
    if (!isLocalStorageSupported) return;

    try {
      window.localStorage["".concat(NAMESPACE, ".").concat(key)] = JSON.stringify(value);
    } catch (e) {}
  }
}

function get(key) {
  if (getter) {
    return getter(key);
  } else {
    if (!isLocalStorageSupported) return;

    try {
      var value = window.localStorage["".concat(NAMESPACE, ".").concat(key)];

      if (value) {
        return JSON.parse(value);
      }
    } catch (e) {
      return;
    }
  }
}

export default {
  update: update,
  set: set,
  get: get,
  setNamespace: setNamespace,
  setHandlers: setHandlers
};