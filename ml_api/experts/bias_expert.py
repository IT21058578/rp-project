import torch
import torch.nn as nn
import pandas as pd
import json
from transformers import BertTokenizer, BertModel
import requests

# Define the BERT model with task-specific heads
class MisinformationModel(nn.Module):
    def __init__(self, num_classes_bias, num_classes_fake_news):
        super(MisinformationModel, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.bias_head = nn.Linear(self.bert.config.hidden_size, num_classes_bias)
        self.fake_news_head = nn.Linear(self.bert.config.hidden_size, num_classes_fake_news)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids, attention_mask=attention_mask)
        bias_logits = self.bias_head(outputs.pooler_output)
        fake_news_logits = self.fake_news_head(outputs.pooler_output)
        return bias_logits, fake_news_logits

# Load the bias model
def load_bias_model():
    model_path = 'models/bias_model.pth'
    model = MisinformationModel(num_classes_bias=3, num_classes_fake_news=6)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    return model

# Function to preprocess and tokenize the input text
def preprocess_text(text):
    text = text.lower()
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    return tokenizer(text, truncation=True, padding=True, return_tensors='pt')

# Function to make predictions
def predict_bias_and_fake_news(text, bias_model):
    bias_model.eval()
    # Preprocess and tokenize the input text
    input_data = preprocess_text(text)

    # Make predictions
    with torch.no_grad():
        input_ids = input_data['input_ids']
        attention_mask = input_data['attention_mask']
        bias_logits, fake_news_logits = bias_model(input_ids, attention_mask=attention_mask)

        # Get predicted labels and confidence scores
        bias_probs = torch.nn.functional.softmax(bias_logits, dim=1)
        fake_news_probs = torch.nn.functional.softmax(fake_news_logits, dim=1)

        predicted_bias = torch.argmax(bias_logits, dim=1).item()
        predicted_fake_news = torch.argmax(fake_news_logits, dim=1).item()

        bias_news_confidence = fake_news_probs[0, predicted_fake_news].item()
        bias_confidence = bias_probs[0, predicted_bias].item()

        # Boolean value indicating if the fake news label is "Pants on Fire" or "False"
        bias_news_pred = 1 if predicted_fake_news in [0, 1] else 0

        # Decode labels
        bias_labels = ['Left', 'Center', 'Right']
        fake_news_labels = ['Pants on Fire', 'False', 'Barely True', 'Half True', 'Mostly True', 'True']

        # Return predicted labels and confidence score
        return predicted_bias, bias_confidence, bias_news_pred, bias_news_confidence
