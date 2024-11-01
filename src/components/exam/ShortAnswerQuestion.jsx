import { useTranslation } from "react-i18next";
import Button from "../form-controls/Button/Button";
import QuestionContentInput from "./QuestionContentInput";

export default function ShortAnswerQuestion({ handleInputContent }) {
    const {t}=useTranslation();
    return (
      <div>
        <QuestionContentInput onChange={handleInputContent} />
        <label className="block pb-1 text-sm font-medium text-gray-700">{t('Your Answer')}</label>
        <input type="text" className="border-2 border-gray-500/75 rounded-lg p-4 w-full text-sm" />
        <Button className="bg-blue-800">{t('Submit')}</Button>
      </div>
    );
  }
  