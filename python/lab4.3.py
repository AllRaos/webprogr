import requests
import json

url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
response = requests.get(url)


if response.status_code != 200:
    print("Помилка отримання даних з API ПриватБанку")
    exit()
    
data = response.json()

exchange_rates = {}
for currency in data:
    ccy = currency['ccy'] 
    exchange_rates[ccy] = {
        'buy': float(currency['buy']),
        'sale': float(currency['sale'])
    }

print("Курси валют ПриватБанку:", exchange_rates)

def sell_currency(currency, amount):
    if currency not in exchange_rates:
        return f"Валюта {currency} не підтримується. Доступні валюти: {list(exchange_rates.keys())}"
    
    rate = exchange_rates[currency]['buy']
    uah_amount = amount * rate
    
    return f"За {amount} {currency} ви отримаєте {uah_amount:.2f} UAH за курсом {rate:.2f}"

try:
    currency = input("Введіть валюту (USD або EUR): ").upper()
    amount = float(input("Введіть суму для продажу: "))
    
    result = sell_currency(currency, amount)
    print(result)
except ValueError:
    print("Помилка: введіть коректну числову суму.")