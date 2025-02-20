import React from "react";
import { ComponentConfig } from "@/core/types";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";
import { AutoField, FieldLabel } from "@/core";

const getClassName = getClassNameFactory("Form", styles);

export type FormField = {
  label: string;
  type: "text" | "textarea" | "radio" | "checkbox" | "select";
  options?: { label: string; value: string }[];
};

export type FormProps = {
  fields: FormField[];
};

export const Form: ComponentConfig<FormProps> = {
  fields: {
    fields: {
      type: "array",
      getItemSummary: (field) => field.label || "Field",
      arrayFields: {
        label: { type: "text" },
        type: {
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Textarea", value: "textarea" },
            { label: "Radio", value: "radio" },
            { label: "Checkbox", value: "checkbox" },
            { label: "Select", value: "select" },
          ],
        },
        options: {
          type: "array",
          getItemSummary: (option) => option.label || "Option",
          arrayFields: {
            label: { type: "text" },
            value: { type: "text" },
          },
          defaultItemProps: {
            label: "",
            value: "",
          },
        },
      },
      defaultItemProps: {
        label: "New Field",
        type: "text",
      },
    },
  },
  defaultProps: {
    fields: [],
  },
  render: ({ fields, puck }) => {
    return (
      <Section className={getClassName()}>
        <div className={getClassName("inner")}>
          <form>
            {fields.map((field, index) => (
              <div key={index} className={getClassName("field")}>
                <FieldLabel label={field.label}>
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.label}
                      disabled={puck.isEditing}
                      className={getClassName("input")}
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      placeholder={field.label}
                      disabled={puck.isEditing}
                      className={getClassName("textarea")}
                    />
                  )}
                  {field.type === "radio" && field.options && (
                    <div className={getClassName("options")}>
                      {field.options.map((option, i) => (
                        <div key={i} className={getClassName("option")}>
                          <input
                            type="radio"
                            id={`${field.label}-${index}-${i}`} // Added index to ensure unique IDs
                            name={`${field.label}-${index}`} // Same name groups radios together
                            value={option.value}
                            disabled={puck.isEditing}
                            className={getClassName("radio")}
                          />
                          <label htmlFor={`${field.label}-${index}-${i}`}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === "checkbox" && field.options && (
                    <div className={getClassName("options")}>
                      {field.options.map((option, i) => (
                        <div key={i} className={getClassName("option")}>
                          <input
                            type="checkbox"
                            id={`${field.label}-${index}-${i}`} // Added index to ensure unique IDs
                            name={`${field.label}-${option.value}`} // Unique name for each checkbox
                            value={option.value}
                            disabled={puck.isEditing}
                            className={getClassName("checkbox")}
                          />
                          <label htmlFor={`${field.label}-${index}-${i}`}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === "select" && field.options && (
                    <select
                      disabled={puck.isEditing}
                      className={getClassName("select")}
                    >
                      <option value="">Select an option</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </FieldLabel>
              </div>
            ))}
          </form>
        </div>
      </Section>
    );
  }
}