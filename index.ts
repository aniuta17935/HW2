import { fromEvent, combineLatest, of, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { calculateMortgage } from './calculate';

const selectValue = (ev: Event) => (ev.target as HTMLInputElement).value;

const loanAmount = fromEvent(
  document.getElementById('loanAmount'),
  'input'
).pipe(
  map(selectValue),
  filter(Boolean)
);

const loanLength = fromEvent(
  document.getElementById('loanLength'),
  'input'
).pipe(map(selectValue));

const loanInterest = fromEvent(
  document.getElementById('loanInterest'),
  'input'
).pipe(map(selectValue));

const answer: Observable<string> = combineLatest(
  loanAmount,
  loanLength,
  loanInterest
).pipe(
  map(([amount, length, interest]) => {
    try {
      const amountNumber = parseInt(String(amount), 10);
      const lengthtNumber = parseInt(String(length), 10);
      const interesttNumber = parseInt(String(interest), 10);
      return calculateMortgage(amountNumber, lengthtNumber, interesttNumber);
    } catch (error) {
      return String(error);
    }
  })
);

const result = document.getElementById('result');

answer.subscribe(answer => {
  console.log(answer);
  result.innerText = answer;
});
