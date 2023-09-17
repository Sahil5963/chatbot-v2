import { WidgetLayoutD } from "./layout/global";

export type ChatbotSettingD = {
  id: number;
  name: string;
  project_id: number;
  widget_uid: string;
  language: string;
  logo: string;
  position: string;
  welcome_message: string;
  widget_color: string;
  widget_text_color: string;
  branding_title: string;
  branding_color: string;
  branding_link: string;
  default_questions: string;
  message_bg_color: string;
  message_text_color: string;
  reply_text_color: string;
  reply_bg_color: string;
  enable_widget_form: any;
  enable_navigation_tracking: any;
  notify_to: any;
  base_prompt: string;
  createdAt: string;
  updatedAt: string;
  layout?: WidgetLayoutD | null;
};

export type WidgetFormField = {
  id: number;
  name: string;
  widget_id: number;
  type: string;
  options: null;
  required: number;
  validation_rules: null;
  priority: number;
  deleted_at: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
};

export type WidgetPlace = "showcase" | "chatbot";