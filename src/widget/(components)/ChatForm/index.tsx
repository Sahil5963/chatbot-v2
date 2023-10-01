import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Select from "./Select";
import InputField from "./InputField";
import Phone from "./Phone";
import { useWidget } from "../../context/WidgetContext";
import { FaSpinner } from "react-icons/fa";
import { FieldD, LeadTypes } from "../../types/lead";

export default function Chatform({ onResize, onSubmit }: { onResize: () => any; onSubmit: () => any }) {
  const { setting } = useWidget();

  const scrollRef = useRef<any>();

  const [data, setData] = useState<{ fields: FieldD[]; complete: boolean }>({
    fields:
      setting?.widget_form_field
        ?.sort((a, b) => b.priority - a.priority)
        .map((i, ind) => {
          if (ind === 0) {
            return {
              ...i,
              show: true,
            };
          } else {
            return i;
          }
        }) || [],
    complete: false,
  });

  useEffect(() => {
    setData({
      fields:
        setting?.widget_form_field
          ?.sort((a, b) => b.priority - a.priority)
          .map((i, ind) => {
            if (ind === 0) {
              return {
                ...i,
                show: true,
              };
            } else {
              return i;
            }
          }) || [],
      complete: false,
    });
  }, [setting?.widget_form_field]);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const updateField = ({ val, ind, last = false }: { ind: number; val: any; last?: boolean }) => {
    setData((s) => {
      const old = [...s.fields];
      old[ind] = {
        ...old[ind],
        value: val,
      };
      return { ...s, fields: old, complete: last };
    });
  };

  const onNext = ({ val, ind }: { val: any; ind: number }) => {
    if (!data.fields[ind + 1]) {
      updateField({ ind, val, last: true });
    } else {
      updateField({ ind, val });
      setData((s) => {
        const ol = [...s.fields];
        ol[ind + 1] = {
          ...ol[ind + 1],
          show: true,
        };
        return { ...s, fields: ol };
      });
    }
  };

  useEffect(() => {
    const lastEl = data.fields.filter((i) => i.show).pop();
    if (lastEl) {
      const el = document.getElementById(`lead-field-${lastEl.id}`);
      el?.focus();
    }
  }, [data.fields]);

  const submitForm = useCallback(async () => {
    if (!data.complete) {
      return;
    }

    const f = data.fields.map((i) => {
      let v = i.value;

      if (i.type === LeadTypes.checkbox) {
        v = i.value.join();
      }
      return {
        field_name: i.name,
        field_type: i.type,
        value: v,
      };
    });
    setLoading(true);

    try {
      console.log(f);

      onSubmit();

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      console.error("SUBMITERR", err);
    }
  }, [data]);

  useEffect(() => {
    submitForm();
  }, [submitForm]);

  useEffect(() => {
    const element = scrollRef?.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      onResize();
      // 👉 Do something when the element is resized
    });
    observer.observe(element);
    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, [onResize]);

  //RENDER

  const renderField = ({ field, ind }: { field: FieldD; ind: number }) => {
    switch (field.type) {
      case LeadTypes.name:
      case LeadTypes.email:
      case LeadTypes.text:
      case LeadTypes.textarea:
      case LeadTypes.number:
      case LeadTypes.date_picker:
        return (
          <InputField
            key={field.id}
            field={field}
            onNext={(val) => {
              onNext({ ind, val });
            }}
          />
        );
      case LeadTypes.checkbox:
        return (
          <Checkbox
            key={field.id}
            field={field}
            onNext={(val) => {
              onNext({ ind, val });
            }}
          />
        );
      case LeadTypes.radio:
        return (
          <Radio
            key={field.id}
            field={field}
            onNext={(val) => {
              onNext({ ind, val });
            }}
          />
        );
      case LeadTypes.select:
        return (
          <Select
            key={field.id}
            field={field}
            onNext={(val) => {
              onNext({ ind, val });
            }}
          />
        );
      case LeadTypes.phone:
        return (
          <Phone
            field={field}
            onNext={(val) => {
              onNext({ ind, val });
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Root ref={scrollRef}>
      <div className="info">Thanks for your message! Please provide the following details:</div>

      {data.fields.map((i, ind) => {
        return renderField({ field: i, ind });
      })}

      {loading && (
        <div className="loadingBox">
          <span className="spin">
            <FaSpinner size={24} />
          </span>
          Saving
        </div>
      )}
      {success && <div className="loadingBox">Saved successfully</div>}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  background: #fff;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 1.6rem 1rem;
  animation: popin 0.2s ease-in;

  .info {
    font-size: 14px;
    opacity: 0.6;
    margin-bottom: 1rem;
  }

  .field {
    flex: 1;
    display: flex;
    flex-direction: column;

    &__outer {
      display: none;
      gap: 8px;

      max-height: 0px;
      opacity: 0;
      transition: all 0.2s;

      &.show {
        display: flex;
        opacity: 1;
        max-height: 220px;
      }
    }

    &__label {
      font-size: 13px;
      margin-bottom: 4px;
      font-weight: bold;
      opacity: 0.6;
    }

    input,
    textarea,
    select {
      border: none;
      background: rgba(0, 0, 0, 0.06);
      font-size: 16px;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 8px 10px;
      outline: none;
      &:focus {
        background: rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.3);
      }
    }

    &__btn {
      border: none;
      outline: none;
      align-self: flex-end;
      height: 38px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 120px;
      transition: all 0.2s;
      cursor: pointer;

      svg {
        transition: all 0.2s;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.09);
        svg {
          /* transform: scale(1.1); */
        }
      }

      &.check {
        background: rgba(9, 177, 9, 0.12);
        color: #1ca21c;
      }
    }
  }

  .loadingBox {
    color: #1ca21c;
    display: flex;
    gap: 4px;
    align-items: center;
    margin-top: 1rem;

    .spin {
      align-self: center;
      animation-name: spin;
      animation-duration: 1000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  @keyframes popin {
    from {
      transform: translateY(10);
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
