import styled from "styled-components";

import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { FieldD, Flags } from "../../types/lead";

export default function Phone({ field, onNext }: { field: FieldD; onNext: (val: any) => any }) {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <form
      className={`field__outer ${field.show ? "show" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onNext(`${countryCode}-${phone}`);
      }}
    >
      <div className="field">
        <div className="field__label">{field.name}</div>

        <PhoneDiv>
          <div className="phone">
            {/* <FlagList flags={Flags} setCountryCode={setCountryCode} /> */}
            <select style={{ width: 80 }} onChange={(e) => setCountryCode(e.target.value)}>
              {Flags.map((i) => {
                return (
                  <option value={i.dial_code} key={i.dial_code}>
                    {i.dial_code}
                  </option>
                );
              })}
            </select>
            <input
              id={`lead-field-${field.id}`}
              type="text"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="input"
              placeholder="Enter Phone Number"
              required={field.required ? true : false}
              // name={id.toString()}
            />
            <input type="hidden" value={`${countryCode}-${phone}`} />
          </div>
        </PhoneDiv>
      </div>
      <button key={field.id} className={`field__btn ${field.value ? "check" : ""}`}>
        {field.value ? <BsCheckCircleFill /> : <FiChevronRight />}
      </button>
    </form>
  );
}

const PhoneDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  .phone {
    display: flex;
    gap: 7px;
    flex: 0.3;
    align-items: center;
  }
  .select {
    outline: none;
    padding: 7px;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 5px;
    width: fit-content;
    /* font-family: "Noto Color Emoji", sans-serif; */
  }
  .input {
    flex: 1;
    width: 100%;
  }
`;
