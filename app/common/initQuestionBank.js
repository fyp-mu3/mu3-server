module.exports = [
  {
    id: '1',
    title: 'Simple Array Sum',
    input: '6\n1 2 3 4 10 11',
    output: '31',
    testcases: ['6\n1 2 3 4 10 11', '5\n5 6 7 8 9', '5\n2 3 4 5 6', '8\n1 7 4 0 9 11 2 4'],
    expect: ['31', '35', '20', '38'],
    description: 'Given an array of N integers, can you find the sum of its elements?',
    content: 'Given an array of _N_ integers, can you find the sum of its elements?\n\n### Input Format\n\nThe first line contains an integer _N_ denoting the size of the array. The second line contains _N_ space-separated integers representing the array\'s elements.\n\n### Output Format\n\nPrint the sum of the array\'s elements as a single integer.\n\n### Sample Input\n\n> 6\n\n>1 2 3 4 10 11\n\n### Sample Output\n\n> 31\n\n### Explanation\n\nWe print the sum of the array\'s elements, which is: 1+2+3+4+10+11 = 31',
    rank: 0,
    template: {
      ruby: '#!\/bin\/ruby\r\n\r\nn = gets.strip.to_i\r\narr = gets.strip\r\narr = arr.split(\' \').map(&:to_i)\r\n',
      java: 'import java.io.*;\r\nimport java.util.*;\r\nimport java.text.*;\r\nimport java.math.*;\r\nimport java.util.regex.*;\r\n\r\npublic class Solution {\r\n\r\n    public static void main(String[] args) {\r\n        Scanner in = new Scanner(System.in);\r\n        int n = in.nextInt();\r\n        int arr[] = new int[n];\r\n        for(int arr_i=0; arr_i < n; arr_i++){\r\n            arr[arr_i] = in.nextInt();\r\n        }\r\n    }\r\n}\r\n',
      'c': '#include <math.h>\r\n#include <stdio.h>\r\n#include <string.h>\r\n#include <stdlib.h>\r\n#include <assert.h>\r\n#include <limits.h>\r\n#include <stdbool.h>\r\n\r\nint main(){\r\n    int n; \r\n    scanf(\"%d\",&n);\r\n    int arr[n];\r\n    for(int arr_i = 0; arr_i < n; arr_i++){\r\n       scanf(\"%d\",&arr[arr_i]);\r\n    }\r\n    return 0;\r\n}\r\n'
    }
  },
  {
    id: '2',
    title: 'CamelCase',
    description: 'Given string s, print the number of words in s on a new line ...',
    content: 'Alice wrote a sequence of words in CamelCase as a string of letters, _s_, having the following properties:\n\n- It is a concatenation of one or more words consisting of English letters.\n- All letters in the first word are _lowercase_.\nFor each of the subsequent words, the first letter is _uppercase_ and rest of the letters are _lowercase_.\n\nGiven _s_, print the number of words in _s_ on a new line.\n\n### Input Format\n\nA single line container string _s_.\n\n### Constraints\n\n- 1 <= |s| <= 10^5\n\n### Output Format\n\nPrint the number of words in string _s_.\n\n### Sample Input\n\n> saveChangesInTheEditor\n\n### Sample Output\n\n> 5\n\n ### Explanation\n\nString _s_ contains five words: \n\n1. save\n2. Changes\n3. In\n4. The\n5. Editor\n\nThus, we print 5 on a new line.',
    rank: 3,
    testcases: ['saveChangesInTheEditor', 'iIIIIII', 'hiThere', 'whenIWasAYoungBoy'],
    expect: ['5', '7', '2', '6'],
    template: {
      c: '#include <math.h>\r\n#include <stdio.h>\r\n#include <string.h>\r\n#include <stdlib.h>\r\n#include <assert.h>\r\n#include <limits.h>\r\n#include <stdbool.h>\r\n\r\nint main(){\r\n    char* s = (char *)malloc(10240 * sizeof(char));\r\n    scanf(\"%s\",s);\r\n    return 0;\r\n}\r\n',
      ruby: '#!\/bin\/ruby\r\n\r\ns = gets.strip\r\n',
      java: 'import java.io.*;\r\nimport java.util.*;\r\nimport java.text.*;\r\nimport java.math.*;\r\nimport java.util.regex.*;\r\n\r\npublic class Solution {\r\n\r\n    public static void main(String[] args) {\r\n        Scanner in = new Scanner(System.in);\r\n        String s = in.next();\r\n    }\r\n}\r\n',
      python3: '#!\/bin\/python3\r\n\r\nimport sys\r\n\r\n\r\ns = input().strip()\r\n'
    }
  },
  {
    id: '3',
    title: 'Minimum Absolute Difference in an Array',
    testcases: ['5\n55555 44444 33 22 11', '7\n225 412 475 421 225 730 421'],
    expect: ['11', '0'],
    description: 'Given an array of _n_ integers, find and print the minimum absolute difference between any two elements in the array.',
    content: 'Consider an array of integers, _A = a0,a1,...,an-1_. We define the absolute difference between two elements, ai and aj (where i =/= j), to be the absolute value of ai - aj.\n\n Given an array of _n_ integers, find and print the minimum absolute difference between any two elements in the array.\n\n### Input Format\n\nThe first line contains a single integer denoting _n_ (the number of integers).The second line contains _n_ space-separated integers describing the respective values of _a0,a1,...,an-1_.\n\n### Constraints\n\n- 2 <= _n_ <= 10^5\n\n- -10^9 <= ai <= 10^9\n\n###Output Format\n\nPrint the minimum absolute difference between any two elements in the array.\n\n### Sample Input\n\n> 3\n\n> 3 -7 0\n\n### Sample Output\n\n> 3\n\n### Explanation\n\nWith _n = 3_ intergers in our array, we have three possible pairs: (3, -7), (3, 0), and (-7, 0). The absolute values of the differences between these pairs are as follows:\n\n- |3 - -7| => 10\n\n- |3 - 0| => 3\n\n- |-7 - 0| => 7\n\n',
    rank: 2
  }
]
