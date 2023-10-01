import { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";

export default function FlagList({ flags, setCountryCode }: { flags: any; setCountryCode: any }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(79);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [flagDropdownHeight, setFlagDropdownHeight] = useState(0);
  const flagDivRef = useRef<any>(null);
  const scrollToRef = useRef<any>(null);
  const flagDropdownRef = useRef<any>(null);

  useEffect(() => {
    scrollToRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    const height = flagDropdownRef.current?.offsetHeight;
    setFlagDropdownHeight(height);
  }, [showCountryDropdown, search, flagDropdownHeight]);

  const [selectedOption, setSelectedOption] = useState<any>(
    <>
      <span className="flag-span"> 🇮🇳 </span> +91
    </>
  );
  const filteredFlags = flags.filter((flag: any) => flag.country_name.toLowerCase().includes(search.toLowerCase()));

  const countrySelect = (flag_emoji: string, dial_code: string, id: number) => {
    setSelectedOption(
      <>
        <span className="flag-span"> {flag_emoji} </span> {dial_code}
      </>
    );
    setSelectedIndex(id);
    setCountryCode(dial_code);
  };

  return (
    <FlagDiv flagDropdownHeight={flagDropdownHeight}>
      <div className="selected-country" onClick={() => setShowCountryDropdown(!showCountryDropdown)} ref={flagDivRef}>
        {selectedOption && selectedOption}
      </div>
      {showCountryDropdown && (
        <>
          <ClickAwayListener
            onClickAway={(e: any) => {
              if (flagDivRef.current && !flagDivRef.current.contains(e.target)) {
                setShowCountryDropdown(false);
              }
            }}
          >
            <ul className="flag-dropdown max-w-[80%]" ref={flagDropdownRef}>
              <li className="search-box">
                <input type="search" value={search} className="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
              </li>
              {filteredFlags.map((flag: any, index: number) => {
                return (
                  <li
                    className={`list ${selectedIndex === flag.id ? "selected" : ""}`}
                    key={index}
                    onClick={() => {
                      countrySelect(flag.flag_emoji, flag.dial_code, flag.id);
                      setShowCountryDropdown(false);
                      setSearch("");
                    }}
                  >
                    <span className="flag-span"> {flag.flag_emoji}</span>
                    <span>{flag.country_name}</span>
                    <span>{flag.dial_code}</span>
                  </li>
                );
              })}
            </ul>
          </ClickAwayListener>
          <div className="phoneDropdownHeight" ref={scrollToRef}></div>
        </>
      )}
    </FlagDiv>
  );
}

const FlagDiv = styled.div<any>`
  position: relative;
  max-height: 37px;

  .selected-country {
    padding: 9px;
    border: 1px solid rgb(238, 238, 238);
    width: fit-content;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.06);
    .flag-span {
      margin-left: 3px;
    }
  }
  .flag-span {
    font-family: "Noto Color Emoji", sans-serif;
  }

  .flag-dropdown {
    /* display: none; */
    position: absolute;
    top: 40px;
    left: 0;
    width: fit-content;
    background-color: #fff;
    max-height: 250px;
    max-width: 100%;
    /* width: 75vw; */
    z-index: 55;
    position: absolute;
    overflow-y: auto;
    box-shadow: 0 1px 5px 0 rgba(34, 36, 38, 0.1);
    border: 1px solid rgb(238, 238, 238);
    padding-inline-start: 0;
    @media screen and (max-width: 360px) {
      /* width: 265px; */
    }
    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background-color: #545454;
      border-radius: 30px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background-color: rgba(228, 228, 228, 0.5);
      border-radius: 30px;
    }
    .search-box {
      outline: none;
      /* width: fit-content; */
      position: sticky;
      top: 0;
      background-color: #fff;
      left: 0;
      right: 0;
      padding: 7px;
      .search {
        width: 100%;
        padding: 7px;
        border: 1px solid rgb(238, 238, 238);
        outline: none;
      }
    }
    .list {
      padding: 7px 12px;
      font-size: 15px;
      display: flex;
      gap: 7px;
      align-items: center;
      cursor: pointer;
      &.selected {
        background-color: rgba(238, 238, 238, 0.5);
      }
    }
  }
  .phoneDropdownHeight {
    height: ${(p) => p.flagDropdownHeight}px;
    visibility: hidden;
    pointer-events: none;
  }
`;
