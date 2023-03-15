/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
//import { fsPromises } from 'fs';
import fs from 'fs';

import emailAddresses from 'email-addresses';
function analyseFiles(inputPaths: string[], outputPath: string): string {
  //let fsPromises = promises;
  console.log('Complete the implementation in src/analysis.ts');
  const location: string = inputPaths[0];
  const emailList: string = fs.readFileSync(location, 'utf8');
  //const emailList = await fsPromises.readFile(location);

  const emails: string[] = emailList.split('\n');

  function validateEmail(email: string) {
    const validator = /\S+@\S+\.\S+/;
    return validator.test(email);
  }
  let validEmails = 0;
  let totalEmails = 0;
  const validDomains: string[] = [];
  const categories: Record<string, number> = {};
  emails.forEach((email, index) => {
    if (index > 0 && emails.length - 1 !== index) {
      totalEmails += 1;

      if (validateEmail(email)) {
        validEmails++;
        const domain: string = email.split('@')[1];
        categories[domain] = (categories[domain] || 0) + 1;
        if (!validDomains.includes(domain)) {
          validDomains.push(domain);
        }
      }
    }
  });

  const result: Record<string, unknown> = {
    'valid-domains': validDomains,
    totalEmailsParsed: totalEmails,
    totalValidEmails: validEmails,
    categories,
  };

  fs.writeFileSync(outputPath, JSON.stringify(result));
  console.log('report created successfully');

  return outputPath;
}
//analyseFiles();

export default analyseFiles;
