<?php

// This class was generated on Wed, 01 Aug 2018 16:35:39 PDT by version 0.1.0-dev+0ee05a-dirty of Braintree SDK Generator
// OrdersCaptureRequest.php
// @version 0.1.0-dev+0ee05a-dirty
// @type request
// @data H4sIAAAAAAAC/+x9f28bt7Lo/+9TED4XaAxIcu38OL0BLvBcx0192iR+ttODIreQqN2RxGMuuSW5ltWD890fOCT399pOI6tNQxRtLZK7OzMcDmeGM8N/772lGey93JMqBaUnCc1NoWBvtPcKdKJYbpgUey/3Tly7JpTkdJOBMGQhFaGC4IOTvdHe/ytAbc6pohkYUHrv5YdfRnvfA01BNVr/vXe1ye0ntVFMLPdGez9RxeicgwflnG7OKR+fcAbCjN+AoSk1dHyW7o32foDNA0Y1Yd8b7R0rRTfus1+P9i6Apu8E3+y9XFCuwTb8WjAFadlwrmQOyjDQey9Fwfl/Rg+F2r4KtBmAttHbhPJqBUSDugFFtJGW1New0UjlZ89JSjd6siNEFCxANaEPTV2Qc+xSkAbgFehcCg2kyKUgukgS0HpRcJLILOdgHyVyQcwKiHLUmJCfKC+AMP3yf4uvv36aFBz/D+4XZ/VfiUzdX6DAFEr8T8YEy6h7IjmouiekRlE31nKvH16BaSSRuWEZ+w0siFkhWEIRyjmYNYBAUI/Pz0hCOQfL8yk2uVdPyHH3nUwkvEhB47g23CztwDrqDNKGmkJ3BuLHvz++On13fEk4E9d64sc0qXQPzRTkCjQIg4g+lHR+Au28aVmoxP5Rf8/I483EEhFPCqWsoLC4QDXn7tl+uA/C1G+D1X8Z7X0nVdYWSefUrD5OIKGIm7Lmiu5dDWevAp74DK7e9YolK8tmXrZWIvSjFrRRxQCSXqi4l5TIvEMAjhNkZT9kCDWKo6aqHFWhOTCgtTt4ztB2Q3BjO9vDp0xnNUXnfvO5RCbq4uMpO9Whv8Kk09UjzPzbPXunsGCC2f7tI3BCVdoFP3GtFdC+YRhUO8AyV+FE2aIQaY3ByAm1cswuXgUpM0QqksKcuee2iJVUxqJBzqU2lJPjNFWgNXnyBlJWZOPXijIB6X4X4znjnInllLonGsh3+3roEL7MhAElUBBRTnIHh39yQt7QXFv6fPCQ/UQ5S3Fw0Bx+ebIyJtcvDw6WzKyK+SSR2cFSyiUHdviNOOBs7t/GRF6YgzW7ZgeDb9t3kvrqzY/k+eSQfDgujFw4dOzKyEgihVGS65coLWhhZCleqTGKzQsDFUjr9XqyfjqRanlwdXGwMhl/fnigIRnbd+mJbfgbrT6BzePwibFZwbj+hXH5hf3tsUCY8ldgKOO6O9OeetO0HFDNdLevO9NCinE52zRNmZ9q/yzxzxKzooZQBUTLDAzLQBMBkEKKIglpwKhIYEQU09cjuySkWVm1KwFBFZOarFeggCyYgPHScm75DSYsZZ16kLHlytjF5d4+IW+lqdhxzcwK9QlpFQimUpJTZTbIFjIH4XdBcgFpIVIqTHgCPww81RPynVQEbqmdtBGZBRqFT0xCA2cCpoczwjQpdEE537jNes7ccrBb0qxF4Yk2CsBMRZHNQc0QrFlooxk0W8wmh9n2WGVon50XjFvtASFoSoJWT5M7joltTgmXTnPzPFBqJ04PyxVkTMOEvC+JFF6Lz1tGcOQgyCecQxLIFwZqN0s0zGzzudaMtZWvE0VvQJDvZaGhq3PtRrlPgbMbUJup1e5Ya4fs6ewuwzCI+EETlPlELhYsATKXtyMyp0tPEVxdea3fEmxHqNa4uYFls73HCMN+Byn5R6ENmb1ShdrMCBP+T/IjFZ++ID4SDyRoLyahZxgXx547hdfKjD5offsgrLa/tZDssilgROay4HBDVToiStIUmQtu7SLXa7rZFXrFfBrEQRO/ZkcXwQVT2oydYQDCMLMhc+ByTaiXX6U4kqqUZb2iTBfzcY8400wsOVSvsbLKbl4fIcxqGuOCUzNCX8RmRBZcSmXJLjMkO7W72UfbMIOW2gPo3tzterWHsmuA9tZiLg3RUjVssFq1ATh2bG/Ch39/SuoigATkULmwmp+dWuX2+UrXwJ9W3SDJCpJrq5BawWI1NKteWHgWBa/01d2wcoNuR8MkPRpwViVSpA+gqS6YgQbT7FYgNXB5Oozm0140nfLWg+WIsEWp+zXlVZBlTuEuvaXfKvob4yOSMuVXo4Fbu8aKZEWoJjMBt8ZaKf+kPKPKzNxSI5yKNKPq2m5AVJAzkTIqds4rGRNTqoB2Fl+jo0vAFVuuwC4+uAGOoitlN0xb9L1wKuyKGXlHSUOLzZW8YairoxMJ6XF2+W789PDFi/GRfVl4F05BRh2hvfUXVJX2Ij45duqtkIbMTihnC6kEozPviByR+aaC6h6v5PsfJuTYjd7c7Yt7f2lHIh53DzyhgqbUDg7o3z3+HzSnwg2HBSSmUPc8cLlm5jdQlq3sY9dUGCl24JD7KC47GuKyox79P2FmMyJGrgWyyA3jnC5hQi4z57M1KyqsDVS+BJlxejjb/ep5OoTX0x687GqxmgBH/HQxL9R8RASw5Wou1UpKpwSlzH44MfcifDR7oLPdiaoJufSfnFOmlMSP1b9+N5+hoMJ3lEi0oK1U7YZpzTSuTcrXdKMJvaGMo1E9L4wVrgPvI0lQXZx9YklBLPJ/NtZ+NsQCz/odH43pXqP++zGT/nRmh8+sfhrI9lA2cB42FKZaKmOVSmuyOqUUJTWkVoq/LkAJDU7tyajYkO8UiGRFDCjFjFQMdLXP+b7XBaOC3s1CTncLfhhICWJnMaeG3YDbVLQF4WTFxJ9jpv3WMbWUajpzmx3dmf5g1nKcrKiiiQHc6QjudIdI9V+eHKQy0QdMGFgqXCkHTpU4UKDNgX/92I7VB/t+klJraiyYP4zyYyxDKFiyUuzPuUyufy2kgTrhtFFSLF3LW2nA88pBvR3PisJrkTnsDvxaATXkW8VQv2W64wx5/W3/4ZZd9+2x73/oGVsxn8XLyHzsFIxUZvaTVqa401MkgwfQWkuAD8xOjmZdsJGJyFoqnq6Zb7NKHFUofwrhfaocUpIrlgB5cvL+fJ9kYFZ2cc6puEbX+sgZAEpqPZ47k88oKrQ7HClP7dpk38KB0P386RZ0lz2b7X2udhQEtr+mrFli/sZyR0OrZv1asBvK8fThapOzBFU5VTeTHNktS3oDtPZm4o6N6m+5BCAfakMqtziIyZpdsxzsPiPV0jnlzys89ndmntpJ7/o86q1dguLZjQCzlura4j1XTiPLc47rVfpTm5E7sxmRJVsYx1n1459dmQBwmzO1aeBXNnWR2wB1Z+WZFGY1sgvVau7fvPj6kMx+/vnnn8dv3sysxYyrLKNhos/wHAeM68LDdpaFMdXUGym5njAwC5z4lcn4gVokT58+/e+/aWddjZ9PXuxPdrKkWmfDrP/MzgeBLEGAogZScvbKSyjYynncA4HlVJtpypbMNA9hmu1d8G0/cf3BFK6z4Y6g7/hzBx25uLxWkqegvtJOyaSaMENongNVmkixa9L3OHHv8N7mimVUbQhNUGIG59ST8+O3+yXj/O4p+N3MriEpFDM9Ck67p8+bogDGVtgtZKHGyE0kPOY3gEU1K+SYa0muhVwLO3e2/eSnn0bk5KcT+5+39j+nqA2fnL3auqy/ktcguvgb31zhHVp68LU97DdI27EF3bP6Rz9e+3Qhhdjshsk6W+ngLupJ7A9lURFzOt866IhGkoAOovGRrDIUeYP/2IEu6qsv/qaL1/0xRE5bDOe0j84VidXUYWo32abq0mjvOQesb8+4vW996yaX6GLWeJpfapDrFeNAFsqp0tYyrY2SuWvcjlmjYFlwWh4yWQZDl1wKmiwLlqJrf14YkkpwLgsF/4LEEMo5YeKGcpYiMbai8N+/7byRAjbdKV5aM2RKM7uJNOa41dGzhWIIX+LsejfOBXZZo5yKhFFet2sqE5+SOeVIHqlK0ZcWsAN+9iD3mN+tnj77G7enhgU+fnZ0+PeKEA8yxP3guy1xP2g34vSG8qJJjdDSpcKNc4I7Cy9EudzpJjoWGH619BGPHjWLKWfXQGb/OP95VsXl2HViSsuwWsh3e4KOSQoJhtmGJ/q/dfX2Ve1b/oQgRU+BkcSsZKGpSM1K3+Mr+s7veaXcCUeDixKQnNPEOxlok0NGRFtb5iS0nVhG+Fi22c4mtS3jpRXauiOF2dKqJbTKpi6Mrsvu98AwpCuE3AYJxLIMUkYNcHSB0cKspGK/wUBaA6ELg6fB9m/cELcQC9rC/Ecmrkkdla69xsR1y1LzLa3jAkGohcvOk4/UHSvgqMR9aASNB06kOTuQN6BuGKwP/raiBiTVYxyyPyFXsgr5TgptZGYpktsdkPKRizhdAZm5Jpjhu51LB9tfn17NgkJm949U4tIPz+FoXKh6JddOKM4uTl+dXZyelA+2iP1i+/sFiOSqrWtWbV0eQwbCKBWr85TB3bqYZ8zU0xowGmBHy2SlYNHAwDf07OhhRg1VSzDk/cWPONMZvQYPveMYK51HPozQ9fip9BPMNPnw/uKMXEGW2yfGTs0zkN6r6b14/vev93H+3clsrmCcK5lgbO0ypBF47vqv2YjMnsyc22u2PyPl7qxdnsLM4joLrshr2JQJEhZXKVAiWDZDvq7lMTgcgw9SF3NtJw5Nac53NHHITR3+q7fexYEjq2phlDqkZL4hHy6+OyFHXz970YwcLidALRL7rx0xMbdmf+IFz9zrJG5JImPsDH/LUy3kfVMX8++vrs4DG5b7shlg3h1hoIA3wHe/e3RLJC4CiJEfmxzuXSjP//ubb0qT6Nl+0MkwM0ejmi2CeU5r8rQQNJuzZSELzTckbUyxhowKw5LSheeWIbpecSu68BDqFg9R4VzsVGu2FHar1Af22XFAqf1zcmvR2H+M7fIyWUFGezxTob3mkgpN3Rmpy2kMudse91fbjpxbg7A3KMkHsJ8ZyDrR8K2+x0xoPOacvFsQ+6keMDl/19xZQsuw7qGL+diR3UtoJHBWaENuXKIEELqkTGhnKNfHf+J230ZNbO5ATWzaqPmW7aAmBRq/mXRmyCOhOMRfVe6SbsV419sfk6+GIctBpM5ma4HW6PgjkngXii6taLsALXnh1fEKwt7uP4KGrCMzWK+ksIa5gewRZPB2zBSXwrrdFfHGqkcDmlZXy7pPx3dxvMLArRmDSCQGVuNS3oEva84EVZtT/9lWblyrq0/VR3O4A7bb7N8U3LC8ULnUQErP7RvKODm9NSA0JtI8eXP25nSfnFNlyDsBL0OUpVzUngGt6RLItzJloO9Vao6+fvZ8f0fK2cNPEaop/930uVrLlwS5j1iwHkSJF9uPUBiSGUI2/Sju92NKr3cChrdfKaC1/YaW7W2/1fgty5jB0BpqVpeGKtPKPK5aW5wnCc1zvnH2tAOVoJsSiMWCigT0V+T9xZnGEGjlPAz2d80OR4ftZDc7T25NfCVqT7Yw7fT+EftjPgDe48L1y0PtFGdkXHatlVZHtFmizRJtlmizRJsl2izRZok2S7RZos0SbZZoszySzTIokZjhLZHkW3qCxNEgsd1bFxInPgaht+pXK6o6tPSFtPlIhvVK+mgGrFuGEbq6DHV1QS6k8QTThHbikfFLf4ZKWn0VtGLlrFg5K1bOipWzYuWsWDkrVs6KlbNi5axYOStWzoqVs2LlrFg5K1bOipWzYuWsWDkrVs6KlbNi5axYOStWzoqVs/6IyllzpsxqmlLTclzWm/t8HlSkY8qlcKUoHqkCxZWsPAhE54AVDzgsKXcnmLpe8iD19xwh6COykQXRK1nwFHNesQ6EmzchCdVaJgyT1RBEu9xYBuPfPEJ0Qv65AgE3gEq5ZnOrgIfcWcSeqpTM0lCkY+b9P1crpvsKV5QlKqpTZ859cYqmlv8dzFVB1YY8PSTupJalQcKs7EbGdDgCm8vCmic0x3JfOytEllHGe2+Maff0p4iXh11YmAefKW3CTxbq73Nrh754VstTxTMVyrlcQ0rmsJDK8ebR8+dDo1zied/1Yf+3K9E1W4oJ+V6uLbeM8ClX7wZNwSSB3LJZRm9ZVmSEg1iaVchzb2BvZ/bo+bNOiq0/IrfaYdgQqbFPFwKJlD4USgK3TJsdVUMZrmOHLMDbN3o127usE/r5ZuyrwKS1qgjhlHjLa+Ctc7b/7iJo7pwlVGtTZvP4h1GUuyUG00XBefcYob+/Cfqr0/OL05Pjq9NXgQOV2XylSfls2+c6LzQTloVt+4gIlly7v5DNN/6gEqnh1BoqrDCcA9E5Z8ZVB0Ff58gVunPvbzgpa19xR5I7PJPpJ+UwAZFooLQUJe3QT7pDkJfsBkQX5kbzvUDjaJxFPzk7RCBjacqhi0Gz/V4U3HDPUFaLxiASI909nyTDoD0O9XG6dZViTu0Ws8lY4khBLTd/pUeNd++GKLmCBbtthSj5pv7rQdntyKk3xmoXPlJs5wtIF4s23GVTj3qJXbUii24qdwqv6h7Alm33Mp0f6rglY9zTuqegYp+0Y7UNA8Oe/Ovv5F//yTbvZk3ezWTgXT9+Z4YGRmq1N/1a41AtRBfiRc5e1Ww3SjKqryG1KpGuXWnrn2hV7MS6RCGOxurwIQ7SB7cw8IpW+zmryeMX5nxDQCRqg6ocdYUjlcwVA2NV9RuLqsAY52+phqdHpY/JSILB1KFAhi74tot7nK+k6LuL0zfXiO1berjX9tQ9mVuMqLsDur7YgFbHEKwhTIMJwoy2+oQU1mRvhdN9OJ0cvnjmR9slkXMqOgYpVtgwxYQJc6AgObgaX5yejPHRAxCfWgnswyM63kpHEHUheshpT05O9ndEGe9EwypFabBt/GI8OSkvay6/6lcWxl97BXCJlS69E/jwuS9x7N7cfi6RQlsLxn6CVr0paBNixhwF3r46cZGMupi7+itljNSTy7c7KksNIei/j897OvttHhy024PnQNg+uLt9fVZPY9r+BLw4uE7+0iz6oG0Z5W0n6KnRPCSE0eW19bLP9JacVTtRX/ru7dRuVa3U3bKxJxTCvrLrKth9ePlgiL+FPu0ilN4ZQ/+V9phNyGWR51IZr+OYhvKEYRy+bJcUfFNzbztvlScP0+TwsO4R49IFfRMmsIpnQbkL1T981jssmOewK0+ko1GXeZvtDyBgyOL6GCpuh+/rnH9eqGRFNZD3gvVlqPjuaSHadwd0uoYTosJQgkMn5JQmq2YjAW3onDO9AlevTxg71WQOZg2AkS9lOUqRkgzss8L0vqoW/+drglLnCMG6xMowyn19T3QLmcaCRLUdsx/Kly6UzHw1RP/VrVWoPHb1ldE2+FYBvU7lukf69NRxvqOCs5GmxJDWPkBFWSubzMPHHA3KEtc+4r064jDlC5mBzL9v5JssI4cWvWJ5jrUcV1SkHP9asoUha0VzuxvrQrlMAiwMyjRujy4wjIoQDjRXBz4cYuEOU3JI2GJDZu4zkxLumRMjHj/4FeXEzMI4RdhmJOeFJjO7LBsNAc7wO0AbfluYpxbm0FBCPiMZE/VXTAMWszb0VxVouKejvzKXmuE5vN9xcVLKwsIKEhfn5Sw9X5Nfl9LBfYGSlYLF//zvXlBQUrgBbllrktNNTjlm4nxMzeH/3XMgh2bvp6fbibTvsPodXD6vddUOBWutXV6v+DjEGzo+qb7T4e2KtXfB1luj31Ch98CuLYdr1RpLvMcS77HE+1+2xPuAXAjSqlkiumqMUiFKhSgVvjSpUKorresVqtYoF6JciHLhi5MLpd3cqdZVNkfJECVDlAxfmmQI/o9mUErVGKVClApRKnypUqH0gPeKh3pvlBNRTkQ58aXJifL0rXNUHq2KKBeiXPiLyoWHxIDFNRPXTFwzHxM16YKU2jF79dYujxyfn2H8KagqgTEkNWIQ33ufMKAgkSJhvPEIXsHgEpZr+fgucMVHqTUS9clxngNVWGKi1uEiTsEYX95JQS6V0Tur4li/aLlewLHe3hNuGuK/agN3dgX2jWQJtKe60fyRc+2fDXeHYkFuV/B4yzj1l1H/iJsgyqhBHNEXo6fD3GCB4MeLzhtciNTAUqpNcx1WjT0p6AYyEkZsL4T58ZjfxUpZaWwh3/0KeHi2MwIY8t62V4X8fhB/LSjWpWyAWWscADWM8FUNMTJwvZIcdlx49Lpo+mzwd1/RDZlck2uA3C42jK99cvnD+/0yWvkRLm4ZNibbZmQ0IKMyHJXhL9CxZAXRtCcsvtkeZUOUDVE2fHGGcqGa/mb3u8sX7y9+tKYvqmX1PHRXUMv20po928rhqpm3K4aFv7eelXhONwD9RQ2gU9Fg6L4wZxTh1TcKEmA3frkuCpG6zLpFwReMc92+BKd8djBLcYvS7xXTOacbrBz4Jnz4zpTM1D0xTalpXpjX6riDKK1JfxjKpZPDlzWp5Y65guWyMKOGX2TkS24h/XOjXa7II3DQA24NUVSkPVeG1JvvrihVpd49iA5hq/xD6PHAvSTkkE4RrNZdKq2uWF7uCy4vN1BXpGSSbvmTTtdnV1vk9+mssbhILC4Si4vE4iJbLy7ySywWG3fzR64B6TXc9vFbsz2WjvsUuxZtgjOhjSqSfvPOGw5T1hjUsHl7+tuniZv65ZfBFqk94pwdfh7cn8oIK/W8NaMn5FRYsDRZADWF8v6R3I3T/hIHdQ3GeU8ql2EKnG4AiwLMC6Xd2be76qp+wxi1m4PBe04X3rzkdg2lhXLXm6UWHCuwSxcRzS0gaUBI4w0XbrjvwxcXZiUVyrAw8PE1vzqy06yt/vX19tw/hq6J0uW1Ap4SKcgcVpQvOnbollX8MBff9bpefO90Ae07m1s9w8fadvHJwrKTZZZEZhnDcu16RAzLtbuuRLotSG/vMHvAkf5xpWWi+zy6z6P7/K9ytBacnVYH+DQ3cyitE4ICPhu3czQhogkRTYjPxYT4pdeMOCnV6UErQveZDnrAAVlXzsNQV86+cYbhxHyz9KC7c9QLs+Y1p11lfNRV5N1JiAKUklusveY/PnCSRuvdTVJ1uob12h4M+2iEd282iJZQQVb0BshvoKSrF2/F1L3WS1SGozIcleGoDD9u0gV6yvG6teZ6abT3aMT12+ge6aa6S7xU3Gl15UysV4xDjXH81eNuVKj/up2LLHuunCuLbS4LlqKImxemuohOwb8gMXgNHRPuljl3Hd0ffDtYzhzLdee52xfn+nOe63ZKzV16+NiZOMZd+hZs265i8qfOCgomxziFBZ4j1lAJSUFlRtCj4/YjE9fkVSP5pIUlZ+K6qYOGlmHVUwHHWfrw/fHV6bvjS4KPhC2F5uxA3oC6YbA++NuKGpBUj3HI/uMnC4FIrtq14qu2vvlKGcUUIStInJ5hpN2rM2bKTRe0cVeG7ob1VgoWzUqirqHPfLL2jgFiqFqCIe8vfsQrVTN6HQxCN1dWwRmF023vNMJC98FU1eTD+4szcgVZbp8YO9lpIL1XfL54/vev95EHnBGWKxjnSiZWbonlyF9W5a82/q/ZiMyezJzlNdufdTwTM4vrLNzeew0bErjM4ioFRrdZlQo5CovXOxI4HMO1vbqYaztxwmDzru6zs9zU4b96610cOHLHWE5uzDfkw8V3J+To62cvWjEMYQLUIrH/2hETc2v2J36pz71abynkGWNn+FueaiHvm7qYf391dR7YsNxkzQDz7ggDBc2IRPe7xzxD4iKAdnO203fvQnn+3998U+oZz/aDWaNB3YBGS1WE7YL6ybOMXgiazdmykIXmG58cGKZYQ0aFYYkODiq3DPFaahT+Fx5C3eIhKtyt1FRrthRo7x/YZ8cBpfbPya1FY/8xNqjLZAUZ7UmaC+21vLnQ1J2Rupy2lv4Wub/aduTcalk9rozy2Pusk3rb7WsCv12KHnNO3i1If14w5fzdonVVrGsZ3u11MR87snsJjQTG8KbqouslZUI77bM+/hO3+zZqYnMHamLTRs23bAc1KaB0lj0eikP8hbsC6zoMm+2PyVfDkOUgUuf2aIHW6HhM2Aav9FV0aUXbBWjJi05MS2/3H0HDj0jXf4T8XyuDt2MY4Igtr4g3Vj0a0LS6WtZ9Or6LBxIGbs0Yj02YWBJcyjtwB8+ZoGpz6j/bDFxvd/Wp+sKA6ILtNvs3eEdsoXKpgZTukDeUcXIagoA1efLm7M3pPkZdkXcCXlp9PaN4rFQ9A1rTJZBvZcpA36vUHH397Pn+ri4D69wCdr9S/bvpc7WWLwlyH7FgPYgSL/a3Hr03JDOEbJ6cuN+PKb3eCRjefqWA1vYbWra3/Vbjtyxjhu8zNqtLQ5VpnWdWrS3Ok4TmOd84e9qBGvK1LBZUJKC/Iu8vzvSIaPsK7LK/a3Y4nnlMdrPz+DiA2pMtTDu9f8T+mA+A97hw/fJQO8UZGZdda6XVEW2WaLNEmyXaLNFmiTZLtFmizRJtlmizRJsl2iyPZLMMSiRmeEsk+ZauTHIGydbKPNbBuwTOQZFzJc1QOLHGIdO8PqR2FtTT24MB3ADH2OJyHJGLBShI28etPri7AxieyIX0jdZBWu0a6EIfrGFO81wfZHl+oCEpFDObAwfnuPr+/k7yAvPCwNQXQe3ouX3dw0IvkcKZg7U0wUTeIA1DcEst9HZHkk4baoomXmVTE5czkTKLqibrFeAV9S2ICdMEOFuyOXfhOW7Oajwz2dXqfDhWrl6o7frjg6WKPO2N22y2x1i+P28sX503T1yiRF8pZuzQrVLMZeMdIqSTRP0JyQqdl8VUhZiqEFMVYqpCTFWIW95W6/l/5uU15lJyoD2Wld2H+DQp9/mag7nVc58mXSv40t3j7fY9B5LRtHbeIvrUVPKTFZ+E6TslZjsp2S7fTl7yhPwsC/tpy1cYS9oFLAAzFIZP/rkCQYS0HMxZwkzPIJ/6PLI2JC04ZtA/DMA7JXb7FTjLw0g6DO+chfuQvVuify6JIm28P7s0ES8KQpaI0340oVrLxF0LVPnbHhnZmDcS80Zi3kjMG4l5IzFvJOaNxBisGIMVY7BiDFaMwYoxWDEGK8ZgxRisGIMVY7BiDFbMG4k2S7RZos0SbZZos0SbJdos0WaJNku0WaLNEvNGYt5IzBuJeSOPkjdSXiNzgfe84A3e3yqg16lcDy8FVQ6ezmuDO4tiYNzQFTR2AYRh5VWZWw5Nqpj29NZivgRyQQ301ZV23VPluutVpZs9fRel+lfbEY5ZUzCgMib8ibkP4zfScvUNKEMWSma4V5cxzEYSKiQyyu+KU/9dS1bLQiUwDR9szmqn7zOM3v8EHRo9Yv2k6fZ9UaT5mMwGHyNWZbXgUpiQ018LdkM5uGVhVwLm7Hg54HivwsvbX8btnyHxQaoyLwABcLqhfZeR1VW5QbFUmFbhP1DmE0gmtn9r5kAi0FJJrac96UCtjpgUFJOCYlLQX/cyv37pIMD0yYZGc5QMUTJEyfClSQZn708X3Ts+q+YoGaJkiJLhLysZHv+u8/Jm++rG/L57z6UicyWvQdElYL+fr06i2b3OnFhoIcrHKB+jfIwXpMcL0uMF6fGC9C/ugvR77b7agVqPatPXG7WcqOVELecvpuU8WuXHRzp0bzH0pfvYK6dWDYE+Tcv+Ngq1rmFtbQAXj+rjCy0FVLdihcqmvhwM20XWq81dUNttaHZ++vbV2dvXMyuGZ69O356dvprtrKBoLM35VyrNeQHWYunjXbRkWswb2u6qyeMsoE+oxulfEV1DUWmKSlNUmmINzri3/bkqA7oN6nOvB+iwQY/II6ATK/7Fin+x4l+s+Bcr/sWKf7HiX6yeEatnxOoZsXpGrJ4Rq2fE6hmxekasnhGrZ8TqGbF6Rqz4F22WaLNEmyXaLNFmiTZLtFmizRJtlmizRJslVvx7zIp/Q+AJaWBq5BTTU9riotEzGL37qCEiZULbOd08sE5b7kbeXaStb1AXw05htu3g+CFWSIohmzFkM4ZsxgpJUTJEyRAlw0dLhrdgyLFbw6VCNGB3VWJhQCMaGDBslVVaEbJXVSLAGsyhsOUFmEIJDNcG0VglTV2KME1ShkWhha8H2ze4lRO9XoGCZlmCleQpLkemyG6SaXwRW0j7pHFPZ5TJUSZHmfyXlcmxtHYsrR1La8fS2n9kae3g1upRSDpdUR2J6khUR/7CRVJiGd0oG6JsiLLhsyqje+dpYiyIEoVgFIJRCMZaubFWbqyVG2vlxlq5HZ+iNJRPnfLUfzA1NCJqO1HbidpOrJn7e2rmfs6lcn0YwmdRINfDuvLKYLMo7nfHZz+evpptCZNYG/cLqo37y4NqNWGMTrcsX6ujO9PH52dYVMpdxO7kMdyikcDrNQZblXMD4NifYXYObw3SLrpoIwuXFOJ4rrKoiFkpWSxXZHZ+fHXy/WzbcmrF8pyJ5R2Syo9oyqiqsUe+hnd6MbU9iXQulcEQ+nOpDeXk2FskT95Ayops/FpRJiDd781d7tiBd1mAefhSwxQkuftusAPJG5rj0ekHD8lPLqWHSfEGDE2podWaXzKzKuZ41/9SyiUHdviNOOBs7t/GRF6YgzW7ZgeDb9tHkfL91ZsfyfPJIflwXBhpTXBLbfRVJlIYJbl+6UIqCiPLin/UGMXmhYFmZa/1UxRBVxcohZ4fHmhIsJifntiGv9HqE9g8Dp8YmxWM618Yl1/Y396Uhyke5E9Pvd6ttNvXnWkhxbic7SqNvbR2w15bqWQyAyvUNREAwUJDGjArDEdEMX2NfmEXqKITEFQxqX3I34IJGC8tp1YWtXAbhJWuQWH1b5+Qt9JU7IhWYCKzTIqaMejsG5mDcDEBVvKkhUjRf+OewA8DT7WruQi31E7aiMwCjcInJqGBMwHTw5mzCgvnJvAFIR2kclE9HZa6NgrATJ2uOXNFG0MbzaDZYjY5zHaQklownjKxRAiaGamtntZhALHNKeEycSXtHA8osDshCOPdWQoypmFC3pdECq/F5y0jBNXb8gnnbn/HMFQ/UIcqlH5mm8+1ZqztRTlR9AYE+V4WGjoOlR0Fu6TA2Q2ozVSDumEJtJLkO519Kq0bRPygCcp4IhcLZhUMeTsic7r0FMHVldf6LcF2hGqNm1tqe729z+qw/Q5S8g+71c9eqUJtZlZvdH+SH6mA2Y7xQIL2YhJ6hnFx7LlTeDvp0c32QVhdmnRjIdllU8CIzGXB4YaqdESUpCkyl1d313RX4WK6mE+DOGji1+zoIrhgSpuxUxZBGGY2ZA5crgn18qsUR1KVsqxXlOliPu4RZ5qJJYfqNVZW2c3rI4TZhJxQYTc1ShacmhHRRqrNiCy4lMqSXWZIdmp3s63dXPMQm6C52/VqD2XXAO2JHRBs8VI1bLBatQE4dmxvwod/f0rqIqBpOWDKOAijNr62Q9A18KdVN0iyguTaKqRWsFgNzaoX7rSGV/rqbli5QbejYZIe9a9XNGUfQFNdMAMNptmtQGrg8nQYzaf9IZ+ovPVgOSJsUep+TXkVZJlTuBFjyx7fKvob4yPifHG4uOHWVL7smYBbDCD9J+UZVWbmlhrhVKQZVdd2A6KCnImUUbFzXsmYmFIFtLP4Gh1dAq7YcgV28cENuIJMKbth6KDwwqmwK6Z2AFNpsWjDo66uDTWA9Di7fDd+evjixfgoOF3tu0JQLRLaW39BVWkv4pNjp94KacjshHK2kEowOpuQn5xHer6poGL6To/0+x8m5NiN3tztV35/aUciHncPPKGCphSv8/Ho3z3+HzSnwg2HBSToJL3zgcs1M7+BsmxlH7umwkhxj5d651x2NMRlRz36f8LMZkSMXAtkkRvGOV3ChFxm6Auym6iwNlD5EmTG6eFs96vn6RBeT3vwsqvFagIc8dPFvFDzERHAlqu5VCspnRKUMvvhxNyL8FHg8fvY2omqCbn0n5xTppTEj9W/fjefoaDCd5RItKCtVO2Gac2cg5LyNd1oQm8o42hUzwvjbgDofR/ed4Wqi7NPLCmIRf7PxtrPhljgWb/jozHda9R/P2bSnzqfvdVPA9keygbOw4bCVEtlrFLpj5upKU+hmSCvC1BCg1N7Mio25DsFIlkRA0oxIxUDXe1zvu91gcXq72Qhp7sFPwykBLGzmFPDbsBtKtqCcLJi4s8x037r6DkXbnb0HQuvZfNQmOBOd/iw02D3+rsPg90YyxAKlqwU+594+BBei8xhd+DXCqgh3yqG+i3THWfI62+7MSVhT26Pff9Dz9iK+SxeRuZjp2CkMrOftDIlBElREwC01pK/r+TkaNYFG5mIrKXi6Zr5NqvEUYXypxDep8ohJbliCZAnJ+/P9/1dF1ZMimuS4ApFA0BJrcdzfz5QhS9s5Yjldx/RuwXdZc9me5+rHQWBO3YulTVLzN9Y7mho1awyFWpCrsrDd1U3kxzZLUt6A7T2ZuIDmWpvwZJptSGVWxzEZM2uWQ52n5Fq6Zzy5xUe+zszTz/ugpTy5MWNaSuo7y/PL8+pSoBvW0F567xe7bz9to9s0DnmHJ4LHx+ozA6yOil3BzswtSZy15/X398E/dXp+cXpyfHV6asQAqfM5itNymfbzo95oZkArbF9RARLrt1fyJ4bf2KA1HDyhQorueZAdM6ZcTEg6HQYEU51cCc2vAW1r7izgR06R/tJOUxAJBooLUVJO3RY7BDkJbsB0YW50Xwv0DgaZ9FPzg4RyFiacuhi0Gy/FwU33DOU3c4wctdIdNVBdXpdG6f9VV1W4riVazfwTcYSRwpqufkrPWq8ezdEsTYru21V0vNNPaTALgQaa9eNQjrszheQLhZtuMumHnmPXVX0gZ/KncKruichZdu9TOeHOm7JGPe0JsedqPE+acdqG4aLsHWvv5N//SfbvJs1eTeTgXf9+MnuwlS0XJhp6kknW2cznb4eGodw1XIYkaF+jTYys3iRREGKdzkrFzjm3IlyUcYTN/TKXak7HxfI5xTgLQaLxVCxL+Ia9b0TV2bazzXNc87csdjBv1wY4/fG5G+cnv1y7/zd5dXeaO+cmtXey72Dm6MDPG2RhTlADtQH/8b/T1n6nwMfTro32ru8ZnkJxultDomB1MWFnlhb6OXR14f/+T//HwAA//8=
// DO NOT EDIT

namespace PayPalCheckoutSdk\Orders;

use PayPalHttp\HttpRequest;

class OrdersCaptureRequest extends HttpRequest
{
    function __construct($orderId)
    {
        parent::__construct("/v2/checkout/orders/{order_id}/capture?", "POST");

        $this->path = str_replace("{order_id}", urlencode($orderId), $this->path);
        $this->headers["Content-Type"] = "application/json";
    }


    public function payPalClientMetadataId($payPalClientMetadataId)
    {
        $this->headers["PayPal-Client-Metadata-Id"] = $payPalClientMetadataId;
    }
    public function payPalRequestId($payPalRequestId)
    {
        $this->headers["PayPal-Request-Id"] = $payPalRequestId;
    }
    public function prefer($prefer)
    {
        $this->headers["Prefer"] = $prefer;
    }
}
