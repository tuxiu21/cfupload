# cfupload

`cfupload` is a full-stack project built with Next.js to address Cloudflare's single-upload limit of 100MB. This implementation allows for chunked file uploads, making it possible to upload larger files by breaking them into smaller parts.

## Features

- **Chunked File Uploads:** Overcomes Cloudflare's 100MB upload limit by splitting files into chunks.
- **Customizable Chunk Size:** Configure the size of each chunk to suit your needs.
- **Local File Handling:** Manage upload and download of files stored on your server.

## Configuration

To configure the project, follow these steps:

1. **Create a `.env.local` file** in the root directory of the project with the following parameters:

    ```plaintext
    # A root path that will be used to resolve the path of the files
    BASE_PATH=C:/Users/Rin/Documents/work
    
    # Upload chunk size in megabytes
    NEXT_PUBLIC_CHUNK_SIZE_MB=50
    ```

    Adjust the `BASE_PATH` to the directory where you want to store uploaded and downloaded files. Set `NEXT_PUBLIC_CHUNK_SIZE_MB` to a value less than 100MB to account for possible additional form metadata.

## Installation and Running

1. Install `pnpm` globally:

    ```bash
    npm install -g pnpm
    ```

2. Install project dependencies:

    ```bash
    pnpm install
    ```

3. Build the project:

    ```bash
    pnpm build
    ```

4. Start the server:

    ```bash
    pnpm start
    ```

## Usage

- **Upload Files:** Use the provided upload functionality to send files to the server.
- **Download Files:** Access and download files stored in the specified `BASE_PATH`.

## Contributing

Feel free to submit issues or pull requests to improve the project. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
