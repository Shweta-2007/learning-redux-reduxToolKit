const redux = require("redux");

const produce = require("immer").produce;

const bindActionCreators = redux.bindActionCreators;

const createStore = redux.legacy_createStore;

const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_ORDERED = "ICE_ORDERED";
const ICE_RESTOCKED = "ICE_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: "CAKE_RESTOCKED",
    payload: qty,
  };
}

function orderIce(qty = 1) {
  return {
    type: "ICE_ORDERED",
    payload: qty,
  };
}

function restockIce(qty = 1) {
  return {
    type: "ICE_RESTOCKED",
    payload: qty,
  };
}

// (previousState, action) => newState

const initialState = {
  numOfCakes: 10,
  numOfIce: 20,
};

// In Redux. we don't directly mutate state, So first we spread the existing state, so as to not affect the other properties in the state object. At this point of time we have only one property in state but this is for when we have multiple field in state.

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    case ICE_ORDERED:
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    case ICE_RESTOCKED:
      return {
        ...state,
        numOfIce: state.numOfIce + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);

// const store = createStore(reducer);

const initialState2 = {
  name: "john",
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
  },
};

const reducer2 = (state = initialState2, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return{
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload
      //   }
      // }
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
  }
};

console.log("initial state:", store.getState());
// output => initial state { numOfCakes: 10 }

// store.subscribe(() => console.log("updated state:", store.getState()));

const unsubscribe = store.subscribe(() =>
  console.log("updated state:", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIce, restockIce },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIce();
actions.orderIce();
actions.orderIce();
actions.restockIce(16);

actions.orderIce();

unsubscribe();
