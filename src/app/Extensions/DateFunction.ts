
import { parse, getISOWeek } from "date-fns";


class DateParser {
    private format: string;
  
    constructor(format: string) {
      this.format = format;
    }
    
    extractWeekOfYear =(date: Date): number => {
        const weekOfYear = getISOWeek(date);
        return weekOfYear;
      }
  
    parseDate(dateString: string): Date {
      const parsedDate = parse(dateString, this.format, new Date());
      return parsedDate;
    }
  }
  export default DateParser;