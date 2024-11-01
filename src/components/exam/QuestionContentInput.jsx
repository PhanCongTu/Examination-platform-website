import { useTranslation } from "react-i18next";

export default function QuestionContentInput({ onChange }) {
    const {t}=useTranslation();
    return (
      <div>
        <label htmlFor="contentQuestion" className="block pb-1 text-sm font-medium text-gray-700">{t('Question content')}</label>
        <textarea
          rows="4"
          className="mt-0 border-2 resize-none outline-none border-gray-500/75 w-full rounded-lg p-4 text-sm"
          onChange={onChange}
          defaultValue=""
        ></textarea>
      </div>
    );
  }
  