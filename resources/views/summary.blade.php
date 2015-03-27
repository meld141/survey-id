<head>
    <link rel="stylesheet" type="text/css" href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css' />
</head>
<body style="background-color:#F1F1F1">
    <nav class="nav navbar-default navbar-fixed-top">
        <ul class="nav navbar-brand" style="font-size: 25px;">
            <li>
                SUMMARY
            </li>
        </ul>
    </nav>
    <div id="wrapper" style="padding: 50px;" >
        <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-responsive table-bordered table-hover">
                <thead>
                    <tr style="background-color: #666666; color:white">
                        <th>Site</th>
                        <th>Number of Votes</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Intern Inc</td>
                        <td>{{ (!empty($interninc['votes']) ? $interninc['votes'] : '-') }}</td>
                        <td>{{ (!empty($interninc['percent']) ? $interninc['percent'] . '%' : '-') }}</td>
                    </tr>
                    <tr>
                        <td>Intern Match</td>
                        <td>{{ (!empty($im['votes']) ? $im['votes'] : '-') }}</td>
                        <td>{{ (!empty($im['percent']) ? $im['percent'] . '%' : '-') }}</td>
                    </tr>
                    <tr>
                        <td>Job Street</td>
                        <td>{{ (!empty($jobstreet['votes']) ? $jobstreet['votes'] : '-') }}</td>
                        <td>{{ (!empty($jobstreet['percent']) ? $jobstreet['percent'] . '%' : '-') }}</td>
                    </tr>
                    <tr>
                        <td>Linkedin</td>
                        <td>{{ (!empty($linkedin['votes']) ? $linkedin['votes'] : '-') }}</td>
                        <td>{{ (!empty($linkedin['percent']) ? $linkedin['percent'] . '%' : '-') }}</td>
                    </tr>
                    <tr>
                        <td>Urban Interns</td>
                        <td>{{ (!empty($urban['votes']) ? $urban['votes'] : '-') }}</td>
                        <td>{{ (!empty($urban['percent']) ? $urban['percent'] . '%' : '-') }}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{{ (!empty($id['votes']) ? $id['votes'] : '-') }}</td>
                        <td>{{ (!empty($id['percent']) ? $id['percent'] . '%' : '-') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</div>
</body>