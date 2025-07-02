import { ApiResponse } from './api';

export type TrademarkClassNumbers = string[];

export interface TrademarkGroups {
  [key: string]: string;
}

export interface TrademarkProperties {
  active: string | null;
  applicant_city: string | null;
  applicant_country: string | null;
  applicant_country_of_incorporation: string | null;
  applicant_euipo_identifier: string | null;
  applicant_first_name: string | null;
  applicant_last_name: string | null;
  applicant_legal_form: string | null;
  applicant_legal_name: string | null;
  applicant_name_normalized: string | null;
  applicant_nationality: string | null;
  applicant_phone: string | null;
  applicant_street_address: string | null;
  application_date: string | null;
  application_no: string | null;
  brand: string | null;
  classes: string | null;
  designated_countries: string[] | null;
  display_text: string | null;
  expiry_date: string | null;
  goods_and_services: string | null;
  logo: string | null;
  mark_feature: string | null;
  mark_image_category_code: string | null;
  mark_image_category_kind: string | null;
  mark_record_publication_identifier: string | null;
  parent_application_no: string | null;
  parent_region: string | null;
  previous_application_date: string | null;
  previous_application_number: string | null;
  priority: string | null;
  region: string | null;
  registration_date: string | null;
  registration_number: string | null;
  registry_status: string | null;
  renewal: string | null;
  status: string | null;
  trademark_business_types: string | null;
  word_mark_specification_text: string | null;
  groups: TrademarkGroups;
  display_text: string | null;
  class_numbers: TrademarkClassNumbers;
}

export interface Trademark {
  id: string;
  properties: TrademarkProperties;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export type TrademarkResponse = ApiResponse<Trademark>;

