const moment = require('moment');

// instDT를 지정한 날짜 포맷으로 변환하는 함수
export function formatDate(dateStr, inputFmt, outputFmt) {
    // moment 객체 생성
    const momentDate = moment(dateStr, inputFmt);
    // 원하는 포맷으로 변환하여 반환
    return momentDate.format(outputFmt);
}
export function timelog(...args) {
    // moment 객체 생성
    const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

    // 첫 번째 원소에 색상 적용한 문자열 생성
    const firstArg = `%c${now} ${args[0]}`;
    // 나머지 args를 하나의 문자열로 합침
    const fromSecondArg = args.slice(1).join(' ');

    // 스타일을 적용한 첫 번째 원소의 출력 포맷
    const formattedArgs = [firstArg, `color:#0B60B0`, fromSecondArg ];

    // 콘솔에 출력
    console.log(...formattedArgs);
}
