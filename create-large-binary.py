#! /usr/bin/python

MB = 1024 * 1024
GB = 1024 * MB

with open('large-file.bin', 'wb') as fp:
    for _ in range(8):
        fp.write(bytes(GB))

