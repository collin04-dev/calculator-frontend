import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('calculator functionality', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  })

  test('has an add button', () => {
    expect(container.querySelector('.btn-dark')).not.toBeNull();
    expect(getByText(container, '+')).toBeInTheDocument();
  })

  test('has a subtract button', () => {
    expect(container.querySelector('.btn-dark')).not.toBeNull();
    expect(getByText(container, '-')).toBeInTheDocument();
  })

  test('has an multiply button', () => {
    expect(container.querySelector('.btn-dark')).not.toBeNull();
    expect(getByText(container, '*')).toBeInTheDocument();
  })

  test('has a divide button', () => {
    expect(container.querySelector('.btn-dark')).not.toBeNull();
    expect(getByText(container, '/')).toBeInTheDocument();
  })

  test('Can Add Two Numbers Together', () => {

    let number1 = container.querySelector("#firstNumber");
    let number2 = container.querySelector("#secondNumber");

    fireEvent.change(number1, {target: { value: 3 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(5);
  })

  test('Can Subtract Two Numbers', () => {

    let number1 = container.querySelector("#firstNumber");
    let number2 = container.querySelector("#secondNumber");

    fireEvent.change(number1, {target: { value: 10 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '-');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(8);
  })

  test('Can Multiply Two Numbers', () => {

    let number1 = container.querySelector("#firstNumber");
    let number2 = container.querySelector("#secondNumber");

    fireEvent.change(number1, {target: { value: 4 } });
    fireEvent.change(number2, {target: { value: 5 } });

    const button = getByText(container, '*');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(20);
  })

  test('Can Divide Two Numbers', () => {

    let number1 = container.querySelector("#firstNumber");
    let number2 = container.querySelector("#secondNumber");

    fireEvent.change(number1, {target: { value: 12 } });
    fireEvent.change(number2, {target: { value: 6 } });

    const button = getByText(container, '/');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(2);
  })

})