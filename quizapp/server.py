from http.server import BaseHTTPRequestHandler, HTTPServer
import yaml
import json


def load_questions(filepath):
	""" Loads quiz questions from a YAML file """
	try:
		with open(filepath, 'r') as file:
			questions = yaml.safe_load(file)
		return questions
	except Exception as e:
		print(f"Error in loading questions: {e}")
		return None

class requestHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		routes = {
			"/questions": self._get_questions
		}

		handler = routes.get(self.path)
		if handler is None:
			print("Error during getting a handler function: handler is None")
			self.send_error(404, "Not Found")
		try:
			handler()
		except Exception as e:
			print("Error during get request: {e}")
			self.send_error(500, "Internal Server Error")
		return 0
	
	def _get_questions(self):
		if self.questions == None:
			raise ValueError("Error in _get_questions: questions are Empty")
		content = json.dumps(self.questions)
		self.send_response(200)
		self.send_header('Content-Type','application/json')
		self.send_header('Access-Control-Allow-Origin','*')
		self.end_headers()
		self.wfile.write(content.encode())

	@classmethod
	def set_questions(cls, questions):
		"""" Sets the list of questions for the quiz application."""
		cls.questions = questions


def main():
	questions = load_questions('questions.yaml')
	if questions is None:
		print("Failed to load questions. Exiting.")
		return 1
	print(questions)
	requestHandler.set_questions(questions)
	
	server_address = ('', 8000) #localhost, port
	server = HTTPServer(server_address, requestHandler)
	print("Server up and running, localhost:8000")
	server.serve_forever()
	return 0

if __name__ == "__main__":
	main()

