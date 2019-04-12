# -*- coding: utf-8 -*
# 是一个注释

class Complex:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def print_age(self):
    print(self.age)

c1 = Complex('张三', 12)

print(c1.name)

c1.print_age()
