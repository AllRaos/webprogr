
input_data = input("Введіть числа через пробіл: ")
number_list = input_data.split() 
print("Список введених даних:", number_list)

number_list = [int(num) for num in number_list]
print("Список чисел (int):", number_list)

sum_numbers = sum(number_list)
print("Сума елементів списку:", sum_numbers)

if len(number_list) == 3:
    x, y, z = number_list 
    print(f"Розпаковка (3 числа): x={x}, y={y}, z={z}")
elif len(number_list) > 3:
    x, *y, z = number_list  
    print(f"Розпаковка (>3 чисел): x={x}, y={y}, z={z}")
else:
    print("Введено менше 3 чисел, розпаковка неможлива.")