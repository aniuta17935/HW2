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
      let am = parseInt(String(amount), 10);
      let len = parseInt(String(length), 10);
      let int = parseInt(String(interest), 10);
      return calculateMortgage(int, am, len);
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
