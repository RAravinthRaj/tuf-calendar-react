/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarApiResponse,
  CalendarNote,
  getDateEntries,
} from "../../../../db";

export const fetchNotes = async (
  dateKey: string,
): Promise<CalendarApiResponse<CalendarNote[]>> => {
  if (!dateKey) {
    throw new Error("Missing date key.");
  }

  return {
    payload: getDateEntries(dateKey).notes,
  };
};

