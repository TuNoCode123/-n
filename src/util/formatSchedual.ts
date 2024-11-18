export const formatSchedual = (isoString: string | undefined) => {
  // Tạo đối tượng Date từ chuỗi ISO
  if (!isoString) return;
  const date: Date = new Date(isoString);

  // Định dạng giờ và phút
  const formattedTime: string = date
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", ":");

  // Định dạng ngày, tháng, năm
  const formattedDate: string = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Kết quả
  const formattedResult: string = `${formattedTime}, ${formattedDate}`;
  return formattedResult;
};
