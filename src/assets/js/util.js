const moment = require('moment');

// instDT를 지정한 날짜 포맷으로 변환하는 함수
export function formatDate(dateStr, inputFmt, outputFmt) {
    // moment 객체 생성
    const momentDate = moment(dateStr, inputFmt);
    // 원하는 포맷으로 변환하여 반환
    return momentDate.format(outputFmt);
}