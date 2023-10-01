import { useState } from "react";
import styled from "styled-components";
import { FieldD } from "../../types/lead";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";

export default function Radio({ field, onNext }: { field: FieldD; onNext: (val: any) => any }) {
  const [val, setVal] = useState("");

  let options: any[] = [];

  if (field.options) {
    options = JSON.parse(field.options);
  }

  return (
    <form
      className={`field__outer ${field.show ? "show" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();

        if (val) {
          onNext(val);
        } else {
          if (field.required === 0) {
            onNext("");
          }
        }
      }}
    >
      <div className="field">
        <div className="field__label">{field.name}</div>

        <RadioDiv>
          {options.map((i) => {
            return (
              // <input
              //   key={i.id}
              //   required={field.required === 1 ? true : false}
              //   type="radio"
              //   name={field.name}
              //   // checked={false}
              //   value={i.id}
              //   onChange={(e) => {
              //     setVal(e.target.value);
              //     if (e.target.value) {
              //       onNext(e.target.value);
              //     }
              //   }}
              // />

              <label htmlFor={i.id.toString()} key={i.id}>
                <div className="input-box">
                  <input
                    type="radio"
                    id={i.id.toString()}
                    name={field.name}
                    className="input"
                    required={field.required === 1 ? true : false}
                    value={i.id}
                    onChange={(e) => {
                      setVal(e.target.value);
                      if (e.target.value) {
                        onNext(e.target.value);
                      }
                    }}
                  />
                  {i.text}
                  <span className="circle"></span>
                </div>
              </label>
            );
          })}
        </RadioDiv>
      </div>
      <button key={field.id} className={`field__btn ${field.value ? "check" : ""}`}>
        {field.value ? <BsCheckCircleFill /> : <FiChevronRight />}
      </button>
    </form>
  );
}

const RadioDiv = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .input-box {
    position: relative;
    padding-left: 26px;
  }
  /* hide default */
  .input-box .input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* customizing */
  .circle {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #f3f4f6;
    border-radius: 50%;
    border: 1px solid #e5e7eb;
  }

  .input-box .input:checked ~ .circle {
    background-color: ${(p) => p.primaryColor || "#000"};
    transition: all 0.3s;
  }

  .input-box .circle:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    transform: scale(0.8) translate(-50%, -50%);
    opacity: 0;
  }

  .input-box .input:checked ~ .circle:after {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
    transition: all 0.3s;
  }
`;
