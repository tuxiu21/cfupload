import prompt from "prompt";
import fs from "fs";
import crypto from "crypto";
import colors from "colors";

main()

function main() {
  // 检测是否有 .env.local 文件

  const envLocalExists = fs.existsSync('.env.local');
  if (envLocalExists) {
    console.log(colors.red('Configuration file '),colors.underline('.env.local'),colors.red(' already exists!'),colors.red(' Please remove it first.'));
    return;
  }
  console.log('\u{1F9E1}',colors.rainbow(' Welcome to the configuration setup!'));
  

  // 生成ssh key
  const secret = crypto.randomBytes(64).toString('hex');

  // prompt.message = colors.underline("Prompt");
  // prompt.delimiter = colors.green(":");

  prompt.start();
  prompt.get([
    {
      name: 'USER_NAME',
      description: 'Enter your '+colors.underline('username'),
      required: true
    },
    {
      name: 'USER_PASSWORD',
      // description: 'Enter your password',
      description: 'Enter your '+colors.underline('password'),
      hidden: true,
      required: true,
    },
    { 
      name: 'genKey', 
      // description: 'Do you want to auto-generate a secret key? (true/false)', 
      description: 'Do you want to auto-generate a '+colors.underline('secret key')+'? (true/false)',
      type: 'boolean', 
      required: true,
    },
    {
      name: 'SECRET_KEY', 
      // description: 'Enter your secret key', 
      description: 'Enter your '+colors.underline('secret key'),
      required: true, 
      hidden: true,
      ask: () => {
        return !(prompt.history('genKey')?.value)
      }
    },
    {
      name:'BASE_PATH',
      // description:'Enter a absolute path for file share',
      description:'Enter a '+colors.underline('absolute path')+' for file share',
      required:true,
      conform:(value)=>{
        return fs.existsSync(value)
      }
    },
    {
      name:'NEXT_PUBLIC_CHUNK_SIZE_MB',
      // description:'Enter a number for chunk size in MB',
      description:'Enter a number for '+colors.underline('chunk size')+' in MB',
      required:true,
      conform:(value)=>{
        return !isNaN(value)
      },
      default: 50
    }

  ] , (err, result) => {
    if (err) {
      console.error('Error during input:', err);
      return;
    }
    // 将输入的信息格式化为环境变量内容
    result.SECRET_KEY = result.genKey ? secret : result.SECRET_KEY;
    delete result.genKey;
    const envContent = Object.entries(result).map(([key, value]) => `${key}=${value}`).join('\n');


    // 写入到 .env 文件
    fs.writeFileSync('.env.local', envContent, 'utf8');

    // console.log('Configuration saved to .env.local file.');
    console.log('\u2705',colors.green('Configuration saved to'),colors.underline('.env.local'),colors.green('file.'));
    console.log('\u2705',colors.green('You can now build the project. Or you can modify the configuration file manually.'))
    
    

  })

}

