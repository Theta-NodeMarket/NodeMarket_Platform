import { thetaUploadUrl } from "@/utils/consts";

async function getAuthToken() {
  if (!window.ethereum) return "No Web3 Provider!";
  const accounts = await window.ethereum.request<any>({
    method: "eth_requestAccounts",
  });
  if (!accounts) return "No Web3 Accounts!";
  const address = accounts[0];
  const timestamp = Date.now().toString();
  const msg = "Theta EdgeStore Call " + timestamp;
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [msg, address],
  });
  const auth_token = `${timestamp}.${address}.${signature}`;
  return auth_token;
}

// if (!input?.files) return;
// const form = new FormData();
// for (let i = 0; i < input.files.length; i++) {
//   form.append("directory", input.files[i], `test/${input.files[i].name}`);
// }
// for (const file of input.files) {
//   form.append("directory", file, `test/${file.name}`);
// }

const sendFileToTheta = async (file: File) => {
  const token = await getAuthToken();
  if (
    token.includes("No Web3 Provider!") ||
    token.includes("No Web3 Accounts!")
  )
    return token;

  const headers = new Headers();
  headers.append("x-theta-edgestore-auth", token);
  
  const form = new FormData();
  form.append("directory", file, `./${file.name}`);
  
  try{
    const res = await fetch(thetaUploadUrl, {
      method: "POST",
      body: form,
      headers,
    });
    
    return res;
  } 
  catch 
  {
    var res = "Could not recieve response from Theta. Try again later!";
    return res;
  }

};

export const useTheta = () => {
  return { sendFileToTheta };
};
