import { stages } from "@/data/pregnancy";
import { ImageComponent } from "@/screens/education/components/details-component/image";
import { ListComponent } from "@/screens/education/components/details-component/list";
import { PlainTextComponent } from "@/screens/education/components/details-component/plainText";

export const findStageByDays = (days: number) => {
  for (let i = stages.length - 1; i >= 0; i--) {
    const stage = stages[i];
    if (days >= stage.days_range[0] && days <= stage.days_range[1]) {
      return stage;
    }
  }
  return null;
};

export const getTotalDays = (endDate: Date): number => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(endDate).getTime();
  const timeDifference = currentDate - targetDate;
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return dayDifference;
};

const toBengaliNumerals = (number: number) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(number).replace(/\d/g, (digit: any) => bengaliDigits[digit]);
};

// Helper function to calculate the difference in weeks between two dates
const calculateWeeksDifference = (startDate: Date, endDate: Date): number => {
  const oneWeekInMilliseconds: number = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / oneWeekInMilliseconds
  );
};

export const getCurrentPregnancyMonthsWeeks = (conceptionDate: number) => {
  const today = new Date();
  const weeks = calculateWeeksDifference(new Date(conceptionDate), today);
  const months = Math.floor(weeks / 4);
  const remainingWeeks = weeks % 4;
  let remainingWeeksText = "";
  if (months === 0) {
    switch (remainingWeeks) {
      case 0:
        remainingWeeksText = "প্রথম";
        break;
      case 1:
        remainingWeeksText = "দ্বিতীয়";
        break;
      case 2:
        remainingWeeksText = "তৃতীয়";
        break;
      default:
        remainingWeeksText = toBengaliNumerals(remainingWeeks) + " সপ্তাহ";
        break;
    }
    return `${remainingWeeksText} সপ্তাহ`;
  } else {
    return `${toBengaliNumerals(months)} মাস ${toBengaliNumerals(
      remainingWeeks
    )} সপ্তাহ`;
  }
};

export const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const shuffleArray = (array: any[]) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const getComponent = (type: string) => {
  switch (type) {
    case "plain":
      return PlainTextComponent;

    case "list":
      return ListComponent;

    case "image":
      return ImageComponent;

    default:
      return null;
  }
};
