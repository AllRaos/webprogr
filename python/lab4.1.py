import random

random_numbers = [random.randint(1, 100) for _ in range(10)]
print("Випадкові числа:", random_numbers)

grades = {"Іванов": 75, "Петров": 45, "Сидоров": 80, "Коваленко": 30}
passed_students = [name for name, grade in grades.items() if grade >= 50]
print("Студенти, що здали:", passed_students)

text = 'grt743gfcg0r3'
digits = [int(char) for char in text if '0' <= char <= '9']
print("Цифри з рядка:", digits)

numbers = [45, 67, 24, 45]
remainder_dict = {num: num % 10 for num in numbers}
print("Словник з остачами:", remainder_dict)

numbers = [45, 67, 24, 150]
has_above_100 = any(num > 100 for num in numbers)
all_above_100 = all(num > 100 for num in numbers)
print("Чи є хоча б одне число > 100?", has_above_100)
print("Чи всі числа > 100?", all_above_100)

