export const formatDateArabic = (date: Date | string): string => {
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
  
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    if (date instanceof Date && !isNaN(date.valueOf())) {
      const day = date.getDate();
      const month = arabicMonths[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } else {
      return 'تاريخ غير صالح'; // Invalid Date in Arabic
    }
  };
  