import http.server
import socketserver
import os
import logging

# Configuration
HTTP_HOST = "0.0.0.0"
HTTP_PORT = 8080
WEB_DIR = "./mobile/web"

# Logging
LOG_LEVEL = logging.INFO
LOG_FILE = "taklifnomavip.log"
logging.basicConfig(filename=LOG_FILE, level=LOG_LEVEL, format='%(asctime)s - %(levelname)s - %(message)s')

class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Set base directory
        path = super().translate_path(path)
        if os.path.exists(path) and not os.path.isdir(path):
            return path
        return os.path.join(WEB_DIR, "index.html")

    def log_message(self, format, *args):
        logging.info("%s - - [%s] %s\n" %
                     (self.client_address[0],
                      self.log_date_time_string(),
                      format % args))

if __name__ == "__main__":
    os.chdir(WEB_DIR)

    handler = SPARequestHandler
    httpd = socketserver.TCPServer((HTTP_HOST, HTTP_PORT), handler)

    print(f"Server started at http://{HTTP_HOST}:{HTTP_PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()
