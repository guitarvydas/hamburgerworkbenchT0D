import sys
import re
import urllib.parse

for line in sys.stdin:
    if (re.search (r'"\$"',line)):
        line = re.sub (r'"\$"', 'k_dollar', line)

    if (re.search (r'"%call"',line)):
        line = re.sub (r'"%call"', 'kp_call', line)

    if (re.search (r'"%case"',line)):
        line = re.sub (r'"%case"', 'kp_case', line)

    if (re.search (r'"%cond"',line)):
        line = re.sub (r'"%cond"', 'kp_cond', line)

    if (re.search (r'"%condelse"',line)):
        line = re.sub (r'"%condelse"', 'kp_condelse', line)

    if (re.search (r'"%condif"',line)):
        line = re.sub (r'"%condif"', 'kp_condif', line)

    if (re.search (r'"%cons"',line)):
        line = re.sub (r'"%cons"', 'kp_cons', line)

    if (re.search (r'"%constructor"',line)):
        line = re.sub (r'"%constructor"', 'kp_constructor', line)

    if (re.search (r'"%end"',line)):
        line = re.sub (r'"%end"', 'kp_end', line)

    if (re.search (r'"%function"',line)):
        line = re.sub (r'"%function"', 'kp_function', line)

    if (re.search (r'"%mapλ"',line)):
        line = re.sub (r'"%mapλ"', 'kp_map', line)

    if (re.search (r'"%module"',line)):
        line = re.sub (r'"%module"', 'kp_module', line)

    if (re.search (r'"%no"',line)):
        line = re.sub (r'"%no"', 'kp_no', line)

    if (re.search (r'"%overwrite"',line)):
        line = re.sub (r'"%overwrite"', 'kp_overwrite', line)

    if (re.search (r'"%persistent"',line)):
        line = re.sub (r'"%persistent"', 'kp_persistent', line)

    if (re.search (r'"%prototype"',line)):
        line = re.sub (r'"%prototype"', 'kp_prototype', line)

    if (re.search (r'"%scope"',line)):
        line = re.sub (r'"%scope"', 'kp_scope', line)

    if (re.search (r'"%switch"',line)):
        line = re.sub (r'"%switch"', 'kp_switch', line)

    if (re.search (r'"%yes"',line)):
        line = re.sub (r'"%yes"', 'kp_yes', line)

    if (re.search (r'"%yield"',line)):
        line = re.sub (r'"%yield"', 'kp_yield', line)

    if (re.search (r'"\'"',line)):
        line = re.sub (r'"\'"', 'k_q', line)

    if (re.search (r'"-"',line)):
        line = re.sub (r'"-"', 'k_dash', line)

    if (re.search (r'"\."',line)):
        line = re.sub (r'"\."', 'k_dot', line)

    if (re.search (r'"="',line)):
        line = re.sub (r'"="', 'k_equal', line)

    if (re.search (r'"@"',line)):
        line = re.sub (r'"@"', 'k_at', line)

    if (re.search (r'"A"',line)):
        line = re.sub (r'"A"', 'k_A', line)

    if (re.search (r'"Z"',line)):
        line = re.sub (r'"Z"', 'k_Z', line)

    if (re.search (r'"\["',line)):
        line = re.sub (r'"\["', 'k_lb', line)

    if (re.search (r'"\\""',line)):
        line = re.sub (r'"\\""', 'k_dq', line)

    if (re.search (r'"\]"',line)):
        line = re.sub (r'"\]"', 'k_rb', line)

    if (re.search (r'"_"',line)):
        line = re.sub (r'"_"', 'k_underscore', line)

    if (re.search (r'"a"',line)):
        line = re.sub (r'"a"', 'k_smalla', line)

    if (re.search (r'"case"',line)):
        line = re.sub (r'"case"', 'k_case', line)

    if (re.search (r'"cond"',line)):
        line = re.sub (r'"cond"', 'k_cond', line)

    if (re.search (r'"condelse"',line)):
        line = re.sub (r'"condelse"', 'k_condelse', line)

    if (re.search (r'"condif"',line)):
        line = re.sub (r'"condif"', 'k_condif', line)

    if (re.search (r'"constructor"',line)):
        line = re.sub (r'"constructor"', 'k_constructor', line)

    if (re.search (r'"function"',line)):
        line = re.sub (r'"function"', 'k_function', line)

    if (re.search (r'"module"',line)):
        line = re.sub (r'"module"', 'k_module', line)

    if (re.search (r'"prototype"',line)):
        line = re.sub (r'"prototype"', 'k_prototype', line)

    if (re.search (r'"scope"',line)):
        line = re.sub (r'"scope"', 'k_scope', line)

    if (re.search (r'"switch"',line)):
        line = re.sub (r'"switch"', 'k_switch', line)

    if (re.search (r'"z"',line)):
        line = re.sub (r'"z"', 'k_smallz', line)

    if (re.search (r'"{"',line)):
        line = re.sub (r'"{"', 'k_lbb', line)

    if (re.search (r'"}"',line)):
        line = re.sub (r'"}"', 'k_rbb', line)

    if (re.search (r'"~"',line)):
        line = re.sub (r'"~"', 'k_tilde', line)

    if (re.search (r'"λ"',line)):
        line = re.sub (r'"λ"', 'k_lambda', line)

    if (re.search (r'"▹"',line)):
        line = re.sub (r'"▹"', 'k_param', line)

    if (re.search (r'"◦"',line)):
        line = re.sub (r'"◦"', 'k_symbol', line)

    if (re.search (r'"❮"',line)):
        line = re.sub (r'"❮"', 'k_vlb', line)

    if (re.search (r'"❯"',line)):
        line = re.sub (r'"❯"', 'k_vrb', line)

    if (re.search (r'"▹self"',line)):
        line = re.sub (r'"▹self"', 'k_self', line)

    # if (re.search (r'"\$"',line)):
    #     line = re.sub (r'"\$"', 'k_dollar', line)
    # if (re.search (r'"\["',line)):
    #     line = re.sub (r'"\["', 'k_lb', line)
    # if (re.search (r'"\]"',line)):
    #     line = re.sub (r'"\]"', 'k_rb', line)

    print (line, end='')
