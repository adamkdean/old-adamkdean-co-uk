---title: Quickly and easily upload files with FtpWebRequestslug: quickly-and-easily-upload-files-with-ftpwebrequestdate: 2013-03-08 13:29tags:  - ftp - ftpwebrequest - c---I've just been migrating the *systems* at work to a new host and it's mostly .NET 2.0 stuff, among the lot is some code which uploads images to a server, which for some strange reason has decided to stop working after 3 years and start uploading gobbledygook instead. 

I decided to bypass the old clunky FTP class and just use `FtpWebRequest` instead, and thought I'd post here how easy it is (and for future reference! ha).

There are four input variables here: `requestUriString`, `filePath`, `username`, and `password`.

`requestUriString` should be in the format `ftp://10.10.10.10/path/filename.jpg` where the IP is your FTP hostname. The root of this FTP request will be the root of your FTP user account. If you want to upload the image to a directory, include that path in the Uri. Finally, put the desired filename on the end of your request Uri.

`filePath` should be the path to your local file, this is used by File.ReadAllBytes( ... ), and is only for getting the data from the local machine.

`username` and `password` are your FTP login credentials.

The following is an example of how you can quickly and easily upload files using `FtpWebRequest`.

    public static bool UploadExample(string requestUriString, string filePath, 
        string username, string password)
    {
        bool success = true;

        try
        {                
            var request = (FtpWebRequest)WebRequest.Create(requestUriString);
            request.Method = WebRequestMethods.Ftp.UploadFile;
            request.Credentials = new NetworkCredential(username, password);

            // we read the bytes directly, not with a StreamReader
            var fileContents = File.ReadAllBytes(filePath);
            request.ContentLength = fileContents.Length;
                
            var requestStream = request.GetRequestStream();
            requestStream.Write(fileContents, 0, fileContents.Length);
            requestStream.Close();

            // we don't need to use the return type
            // unless we want to make checks
            request.GetResponse();
        }
        catch (WebException)
        {                
            success = false;
        }

        return success;
    }

Much easier than using/writing a clunky ol' FTP class yourself, no?