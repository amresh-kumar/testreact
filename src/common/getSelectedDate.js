// import { useState } from 'react';
import moment from "moment";

export const formatDate = (value, inputFormat = "YYYY-MM-DD", format = "DD MMM YYYY ") => (value && value !== "" ? moment(value, inputFormat).format(format) : "---");
// formatDate(value, "DD-MM-YY", "MM-DD-YY")