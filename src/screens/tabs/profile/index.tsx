import AnimatedHeader from "components/AnimatedHeader";
import { useChatbot } from "context/ChatbotContext";
import React from "react";
import { styled } from "styled-components";
import { THEME } from "utils/constants/ui";
import { TAB_THEME } from "../ui";
import ScanIcon from "components/icons/ScanIcon";

export default function Profile() {
  const { layout } = useChatbot();

  return (
    <Root>
      <AnimatedHeader
        style={{ background: layout?.primaryColor || THEME.primaryColor, color: layout?.textOnPrimaryColor || THEME.textOnPrimary, height: TAB_THEME.headerHeights.root }}
        className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-h-full"
      >
        <div>Your account</div>
      </AnimatedHeader>

      <div className="padX ygpt-mt-6 ygpt-pb-12">
        <div className="ygpt-mb-8">
          <h4 className="ygpt-text-xl ygpt-font-medium">Verify your account</h4>
          <p className="ygpt-text-gray-500">Please verify your account to access your previous messages and personalized experinece</p>
        </div>

        <form className="ygpt-gap-2 ygpt-flex ygpt-flex-col">
          <Field>
            <label htmlFor="name">Name</label>
            <Input color={layout?.primaryColor || THEME.primaryColor} name="name" id="name" type="text" required placeholder="Enter Name" />
          </Field>

          <Field>
            <label htmlFor="email">Email</label>
            <Input color={layout?.primaryColor || THEME.primaryColor} name="email" type="email" id="email" required placeholder="Enter email" />
          </Field>

          <Button style={{ background: layout?.primaryColor || THEME.primaryColor, color: layout?.textOnPrimaryColor || THEME.textOnPrimary }}>
            {" "}
            <ScanIcon /> Verify Account
          </Button>
        </form>
      </div>
    </Root>
  );
}

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    font-weight: 600;
    opacity: 0.7;
    margin-bottom: 4px;
  }
`;
const Input = styled.input<{ color: string }>`
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  font-size: 16px;
  height: 52px;
  padding: 1rem;
  outline: none;

  border: 1.6px solid transparent;
  transition: all 0.2s;
  &:focus {
    border-color: ${({ color }) => color + "a1"};
  }
`;
const Button = styled.button`
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 16px;
  height: 52px;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  align-self: stretch;
  width: 100%;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    gap: 0.7rem;
  }
`;
