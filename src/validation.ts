/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import dns from 'dns';
import fs from 'fs';
async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  console.log('Complete the implementation in src/validation.ts');
  // console.log(inputPath);

  const allEmails: string[] = [];
  const testedEmails: string[] = [];
  let emailString = 'Emails\r\n';

  function validateEmail(email: string) {
    const validator = /\S+@\S+\.\S+/;
    return validator.test(email);
  }

  async function resolveEmail(domain: string) {
    return await dns.promises.resolveMx(domain);
  }

  // const mail = [...inputPath, 'fixtures/inputs/another-sample.csv'].map(
  //   async (input: string) => {
  //     try {
  //       const emailList: string = fs.readFileSync(input, 'utf8');
  //       let emails: string[] = emailList.split('\n');

  //       for (const email of emails) {
  //         if (validateEmail(email)) {
  //           let domain = email.split('@')[1];
  //           allEmails.push(email);
  //           try {
  //             await resolveEmail(domain);
  //             testedEmails.push(email);
  //             // console.log(email);
  //           } catch (error) {}
  //           // dns.resolveMx(domain, (err, addr) => {
  //           //   if (err) {
  //           //     //console.log(err);
  //           //   } else {
  //           //     console.log(email);
  //           //     testedEmails.push(email);
  //           //   }
  //           // });
  //         }
  //       }
  //       return testedEmails;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // );
  // const inputPaths = [...inputPath, 'fixtures/inputs/another-sample.csv'];
  for (const input of inputPath) {
    try {
      const emailList: string = fs.readFileSync(input, 'utf8');
      const emails: string[] = emailList.split('\n');

      for (const email of emails) {
        if (validateEmail(email)) {
          const domain = email.split('@')[1];
          // allEmails.push(email);

          try {
            await resolveEmail(domain);
            // testedEmails.push(email);
            emailString += email + '\r\n';
            // console.log(email);
          } catch (error) {
            console.log(error);
          }
          // dns.resolveMx(domain, (err, addr) => {
          //   if (err) {
          //     //console.log(err);
          //   } else {
          //     console.log(email);
          //     testedEmails.push(email);
          //   }
          // });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  fs.writeFileSync(outputFile, emailString);
  console.log('csv file created successfully');
  return outputFile;

  // console.log(emailString);

  // let result = await Promise.all(mail);
  // //result.then((data) => console.log(data[0]));
  // console.log(result[0]);

  // testedEmails;
  //console.log(testedEmails);

  // dns.resolveMx();
  // const location: string[] = [
  //   ...inputPath,
  //   'fixtures/inputs/another-sample.csv',
  // ];

  // let emails: string[] = emailList.split('\n');
}

export default validateEmailAddresses;
