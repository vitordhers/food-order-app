import { useReducer } from "react";
import { IonButton } from "@ionic/react";

const initialState = {
  o1: {
    subOptions: {
      so1: {
        subOptionText: "FDPTA",
        subOptionPrice: 1,
        subOptionAmount: 0,
      },
    },
  },
  o2: {
    subOptions: {
      so2: {
        subOptionText: "FDPTA2",
        subOptionPrice: 1.5,
        subOptionAmount: 0,
      },
    },
  },
};

function reducer(
  state: {
    [optionId: string]: {
      subOptions: {
        [subOptionId: string]: {
          subOptionText: string;
          subOptionPrice: number;
          subOptionAmount: number;
        };
      };
    };
  },
  action: { type: string; optionId: string; subOptionId: string }
) {
  const updatedOptions = { ...state };
  if (action.type === "increment") {
    return {
      ...updatedOptions,
      [action.optionId]: {
        subOptions: {
          [action.subOptionId]: {
            subOptionText:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionText,
            subOptionPrice:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionPrice,
            subOptionAmount:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionAmount + 1,
          },
        },
      },
    };
  }

  if (action.type === "decrement") {
    return {
      ...updatedOptions,
      [action.optionId]: {
        subOptions: {
          [action.subOptionId]: {
            subOptionText:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionText,
            subOptionPrice:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionPrice,
            subOptionAmount:
              state[action.optionId].subOptions[action.subOptionId]
                .subOptionAmount - 1,
          },
        },
      },
    };
  }

  throw new Error();
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count {state["o1"].subOptions["so1"].subOptionText}:
      {state["o1"].subOptions["so1"].subOptionAmount}
      Count {state["o2"].subOptions["so2"].subOptionText}:
      {state["o2"].subOptions["so2"].subOptionAmount}
      <IonButton
        onClick={() =>
          dispatch({ type: "decrement", optionId: "o1", subOptionId: "so1" })
        }
      >
        -
      </IonButton>
      <IonButton
        onClick={() =>
          dispatch({ type: "increment", optionId: "o1", subOptionId: "so1" })
        }
      >
        +
      </IonButton>
    </>
  );
}

export default Counter;
