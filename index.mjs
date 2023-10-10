#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { Command } from 'commander';

const program = new Command();

function random(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearScreen() {
  if (process.platform === 'win32') {
    process.stdout.write('\x1Bc');
  } else {
    console.clear();
  }
}

program
  .version('1.0.0')
  .description('ASCII Learner - Aprende y Practica ASCII');

program
  .command('practice')
  .description('Comienza la practica de ASCII')
  .action(async () => {
    clearScreen();
    console.log(chalk.bold('Bienvenido a ASCII Learner - Modo Practica'));

    let exitPractice = false;

    while (!exitPractice) {
      const trainType = random(1, 2);

      if (trainType === 1) {
        const letterType = random(1, 2);
        const ascii = letterType === 1 ? random(65, 90) : random(97, 122);
        const question = `Introduce el caracter correspondiente a el codigo ASCII ${ascii}:`;

        await inquirer
          .prompt([
            {
              type: 'input',
              name: 'userInput',
              message: question,
            },
          ])
          .then((answers) => {
            const userCharCode = answers.userInput.charCodeAt(0);
            if (userCharCode === ascii) {
              console.log(chalk.green('Felicidades!! Coreecto.'));
            } else {
              console.log(chalk.red('Incorrecto. Intenta de nuevo.'));
            }
          });
      } else if (trainType === 2) {
        const charType = random(1, 3);
        let ascii;
        if (charType === 1) {
          ascii = random(33, 47);
        } else if (charType === 2) {
          ascii = random(58, 64);
        } else {
          ascii = random(91, 96);
        }

        const question = `Introduce el caracter correspondiente a el codigo ASCII ${ascii}:`;

        await inquirer
          .prompt([
            {
              type: 'input',
              name: 'userInput',
              message: question,
            },
          ])
          .then((answers) => {
            const userCharCode = answers.userInput.charCodeAt(0);
            if (userCharCode === ascii) {
              console.log(chalk.green('Felicidades! Correcto.'));
            } else {
              console.log(chalk.red('Incorrecto. Intenta de nuevo.'));
            }
          });
      }

      await inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'continuePractice',
            message: 'Quieres continuar practicando?',
            default: true,
          },
        ])
        .then((answers) => {
          exitPractice = !answers.continuePractice;
        });
    }
  });

program
  .command('show')
  .description('Mostrar caracteres ASCII')
  .addCommand(
    new Command('letters')
      .description('Muestra caracteres ASCII para letras')
      .action(() => {
        clearScreen();
        console.log(chalk.bold('Caracteres ASCII para letras:'));
        for (let i = 65; i <= 90; i++) {
          console.log(`${i}\t${String.fromCharCode(i)}`);
        }
        for (let i = 97; i <= 122; i++) {
          console.log(`${i}\t${String.fromCharCode(i)}`);
        }
      })
  )
  .addCommand(
    new Command('special')
      .description('Muestra caracteres especiales ASCII')
      .action(() => {
        clearScreen();
        console.log(chalk.bold('Caracteres ASCII Especiales:'));
        for (let i = 33; i <= 47; i++) {
          console.log(`${i}\t${String.fromCharCode(i)}`);
        }
        for (let i = 58; i <= 64; i++) {
          console.log(`${i}\t${String.fromCharCode(i)}`);
        }
        for (let i = 91; i <= 96; i++) {
          console.log(`${i}\t${String.fromCharCode(i)}`);
        }
      })
  );

program.parse(process.argv);
