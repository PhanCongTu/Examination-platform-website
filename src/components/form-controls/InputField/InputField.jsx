
import React from 'react';
import { clsx } from 'clsx'

function InputField(props) {
  const { form, name, label, type, disabled, children, defaultValue } = props;
  const { errors } = form.formState;
  const hasError = errors[name];
  return (
    <>
      <div className={clsx(form.formState.isSubmitting ? "opacity-50" : '', disabled ? "hidden" : '')} >
        <label htmlFor={name} className="block pb-1 text-sm font-medium text-gray-700">{label}</label>
        <div className="relative flex justify-center">
          <input
            {...form.register(name)}
            {... defaultValue && form.setValue(name, defaultValue) }
            type={type || 'text'}
            name={name}
            className={clsx("text-opacity-50", "border-2", hasError ? "border-red-500/75" : "border-gray-500/75", "w-full", "rounded-lg", "p-4", "pe-12", "text-sm", "shadow-sm")}
            placeholder={`Enter ${label}`}
            //onChange={(e) => form.setValue(name, e.target.value)}
          />
          
          { children}
          {hasError && <p className="text-sm text-red-500">{hasError?.message}</p>}
        </div>
      </div>
    </>
  );
}

export default InputField;