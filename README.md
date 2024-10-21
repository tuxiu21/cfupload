# cfupload

`cfupload` is a full-stack project built with Next.js to address Cloudflare's single-upload limit of 100MB. This implementation allows for chunked file uploads, making it possible to upload larger files by breaking them into smaller parts.

## Features

- **Chunked File Uploads:** Overcomes Cloudflare's 100MB upload limit by splitting files into chunks.
- **Customizable Chunk Size:** Configure the size of each chunk to suit your needs.
- **Local File Handling:** Manage upload and download of files stored on your server.

## Configuration

You have two options to configure the project:

### Option 1: Interactive Setup

1. Run the following command:
   ```bash
   npm run env-init
   ```
2. Follow the interactive prompts to set up your configuration.

### Option 2: Manual Configuration

1. Create a `.env.local` file in the root directory of the project with the following template:

   ```plaintext
   USER_NAME=root
   USER_PASSWORD=123456
   SECRET_KEY=471d7493bc8325b9e5a31251303396fb9cbfc253401fb75fafd93eba0c80981bad5d719839103ac2d8c0aeef7b5754a09ea254daa76c3e424c4753cb56da661651deb46a2957027b04c1c3365d5ba030593138905dd147079f6588233a1a434fe2ddca5edb76c89d4c9af1e49d0d483f34a5dd2bf4c1f2011432e8a93602298d
   BASE_PATH=C:/Users/YourUsername/Documents/work
   NEXT_PUBLIC_CHUNK_SIZE_MB=50
   ```

   Adjust the values according to your needs:
   - `USER_NAME`: Your desired username
   - `USER_PASSWORD`: Your desired password
   - `SECRET_KEY`: A long, random string for security (you can generate this using a secure method)
   - `BASE_PATH`: The absolute path where you want to store uploaded and downloaded files
   - `NEXT_PUBLIC_CHUNK_SIZE_MB`: Set to a value less than 100MB to account for possible additional form metadata

## Installation and Running

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Set up the configuration (if you haven't already):
   ```bash
   npm run env-init
   ```
   Or manually create the `.env.local` file as described above.

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server or change the port:
   ```bash
   npm run start -p 3000
   ```

## Usage

- **Upload Files:** Use the provided upload functionality to send files to the server.
- **Download Files:** Access and download files stored in the specified `BASE_PATH`.

## Contributing

Feel free to submit issues or pull requests to improve the project. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.