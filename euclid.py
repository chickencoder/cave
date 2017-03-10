def Euclid(n, k):

    data = [[1 if i < n else 0] for i in range(k)]
    print(data)

    while True:

        k = k - n

        if k <= 1:
            break

        elif k < n:
            n, k = k, n

        for i in range(n):
            data[i] += data[-1]
            del data[-1]

    print(data)
    return [x for y in data for x in y]

print(Euclid(3, 8))
