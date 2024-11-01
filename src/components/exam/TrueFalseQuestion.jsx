import { useTranslation } from "react-i18next";
import Button from "../form-controls/Button/Button";

export default function TrueFalseQuestion({ form, submitForm }) {
    const {t}=useTranslation();
    return (
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">{t('Choose the correct answer')}</label>
        <div className="flex gap-4">
          <input type="radio" id="true" name="trueFalse" value="True" />
          <label htmlFor="true">{t('True')}</label>
          <input type="radio" id="false" name="trueFalse" value="False" />
          <label htmlFor="false">{t('False')}</label>
        </div>
        <Button type="submit" className="bg-blue-800">{t('Submit')}</Button>
      </form>
    );
  }
  